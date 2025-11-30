import { state, getPlayerPositions } from '../models/state.js';
import { formations } from '../config/formations.js';
import { positionRoles } from '../config/roles.js';
import { renderSquad } from './renderSquad.js';
import { renderLineup } from './renderLineup.js';
import { calculateRating } from '../services/rating.js';
import { saveData } from '../services/storage.js';
import { exportData, importDataFile } from '../services/importExport.js';
import { createModal, showPositionModal, showRoleSelectionModal, viewPlayerDetails, closeModal, closePlayerDetailsModal, showRoleChangeModal, showPlayerChangeModal } from './modals.js';
import { setupLanguageSwitcher, updateUILanguage } from './languageSwitcher.js';
import { t, translateRole, translatePosition } from '../config/i18n.js';

export function setupEventListeners() {
  // Language switcher
  setupLanguageSwitcher();
  
  // Tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Player form submit
  const form = document.getElementById('player-form');
  form?.addEventListener('submit', handleAddPlayer);
  document.getElementById('cancel-btn')?.addEventListener('click', () => { form.reset(); state.editingPlayerId=null; updateFormTitle(); switchTab('squad'); });

  // Formation selector
  const formationSelect = document.getElementById('formation');
  formationSelect?.addEventListener('change', (e) => { state.currentFormation = e.target.value; saveData(); renderLineup(); });

  // Clear lineup button
  document.getElementById('clear-lineup-btn')?.addEventListener('click', clearLineup);

  // Search & filter
  document.getElementById('search-player')?.addEventListener('input', renderSquad);
  document.getElementById('position-filter')?.addEventListener('change', renderSquad);

  // Export / Import
  document.getElementById('export-data-btn')?.addEventListener('click', exportData);
  document.getElementById('import-data-btn')?.addEventListener('click', () => {
    document.getElementById('import-file-input').click();
  });
  const importInput = document.getElementById('import-file-input');
  importInput?.addEventListener('change', e => { 
    importDataFile(e.target.files[0], () => { renderSquad(); renderLineup(); });
    e.target.value=''; 
  });

  // JSON player import (single player via textarea)
  document.getElementById('import-json-btn')?.addEventListener('click', handleImportJsonPlayer);

  // Attribute color coding and GK toggle
  setupAttributeColorCoding();
  document.querySelectorAll('input[name="position"]').forEach(input => {
    input.addEventListener('change', toggleGKAttributes);
  });

  // Generic delegation for player actions
  document.getElementById('squad-list')?.addEventListener('click', e => {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    const id = parseInt(target.dataset.id);
    switch(target.dataset.action) {
      case 'view-details': viewPlayerDetails(id); break;
      case 'add-lineup': addToLineup(id); break;
      case 'edit-player': editPlayer(id); break;
      case 'delete-player': deletePlayer(id); break;
    }
  });

  // Modal close buttons
  document.addEventListener('click', e => {
    if (e.target.closest('[data-action="close-player-modal"]')) {
      closePlayerDetailsModal();
    }
    if (e.target.closest('[data-action="close-modal"]')) {
      closeModal();
    }
    
    // Close player details modal when clicking outside content
    const playerModal = document.getElementById('player-details-modal');
    if (e.target === playerModal) {
      closePlayerDetailsModal();
    }
  });

  // Pitch interactions
  document.getElementById('pitch')?.addEventListener('click', e => {
    const slot = e.target.closest('.position-slot');
    if (!slot) return;
    
    // Ignore clicks on non-selectable slots
    if (slot.classList.contains('non-selectable')) return;
    
    const slotIndex = parseInt(slot.dataset.slotIndex);
    const position = slot.dataset.position;
    const removeBtn = e.target.closest('[data-action="remove-slot"]');
    const swapBtn = e.target.closest('[data-action="swap-slot"]');
    const changeRoleBtn = e.target.closest('[data-action="change-role"]');
    const changePlayerBtn = e.target.closest('[data-action="change-player"]');
    
    if (removeBtn) { removeFromLineup(slotIndex); return; }
    if (swapBtn) { startSwapMode(slotIndex); return; }
    if (changeRoleBtn) { 
      const playerId = parseInt(changeRoleBtn.dataset.player);
      const position = changeRoleBtn.dataset.position;
      handleRoleClick(playerId, slotIndex, position); 
      return; 
    }
    if (changePlayerBtn) {
      const position = changePlayerBtn.dataset.position;
      const currentRole = changePlayerBtn.dataset.currentRole;
      handlePlayerNameClick(slotIndex, position, currentRole);
      return;
    }
    
    const assignment = state.lineup.find(l => l.slotIndex === slotIndex);
    if (assignment) {
      handleSlotClick(slotIndex, position);
    } else {
      selectPlayerForSlot(slotIndex, position);
    }
  });

  // Drag and drop for pitch
  const pitch = document.getElementById('pitch');
  if (pitch) {
    pitch.addEventListener('dragstart', e => {
      const slot = e.target.closest('.position-slot');
      if (slot && slot.draggable) {
        state.draggedSlotIndex = parseInt(slot.dataset.slotIndex);
        e.dataTransfer.effectAllowed = 'move';
        slot.classList.add('dragging');
      }
    });
    pitch.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    });
    pitch.addEventListener('drop', e => {
      const targetSlot = e.target.closest('.position-slot');
      if (!targetSlot) return;
      
      // Ignore drops on non-selectable slots
      if (targetSlot.classList.contains('non-selectable')) return;
      
      const targetSlotIndex = parseInt(targetSlot.dataset.slotIndex);
      if (state.draggedSlotIndex !== null && state.draggedSlotIndex !== targetSlotIndex) {
        const assignment = state.lineup.find(l => l.slotIndex === targetSlotIndex);
        if (assignment) {
          swapPlayers(state.draggedSlotIndex, targetSlotIndex);
        } else {
          const targetPosition = targetSlot.dataset.position;
          movePlayerToEmptySlot(state.draggedSlotIndex, targetSlotIndex, targetPosition);
        }
      }
    });
    pitch.addEventListener('dragend', e => {
      const slot = e.target.closest('.position-slot');
      if (slot) slot.classList.remove('dragging');
      state.draggedSlotIndex = null;
    });
  }

  document.addEventListener('click', e => {
    if (e.target?.dataset?.action === 'close-modal') closeModal();
    if (e.target?.dataset?.action === 'close-player-modal') closePlayerDetailsModal();
    
    // Modal actions
    const assignSlotTarget = e.target.closest('[data-action="assign-slot"]');
    if (assignSlotTarget) {
      const playerId = parseInt(assignSlotTarget.dataset.player);
      const slotIndex = parseInt(assignSlotTarget.dataset.slot);
      assignToSlot(playerId, slotIndex);
    }

    const assignRoleTarget = e.target.closest('[data-action="assign-role"]');
    if (assignRoleTarget) {
      const playerId = parseInt(assignRoleTarget.dataset.player);
      const slotIndex = parseInt(assignRoleTarget.dataset.slot);
      const role = assignRoleTarget.dataset.role;
      assignWithRole(playerId, slotIndex, role);
    }

    const updateRoleTarget = e.target.closest('[data-action="update-role"]');
    if (updateRoleTarget) {
      const slotIndex = parseInt(updateRoleTarget.dataset.slot);
      const role = updateRoleTarget.dataset.role;
      updateRole(slotIndex, role);
    }

    // New action: select role first for empty slot
    const selectRoleTarget = e.target.closest('[data-action="select-role-for-slot"]');
    if (selectRoleTarget) {
      const slotIndex = parseInt(selectRoleTarget.dataset.slot);
      const position = selectRoleTarget.dataset.position;
      const role = selectRoleTarget.dataset.role;
      closeModal();
      showPlayerListForSlot(slotIndex, position, role);
    }

    // New action: assign player with pre-selected role
    const assignPlayerWithRoleTarget = e.target.closest('[data-action="assign-player-with-role"]');
    if (assignPlayerWithRoleTarget) {
      const playerId = parseInt(assignPlayerWithRoleTarget.dataset.player);
      const slotIndex = parseInt(assignPlayerWithRoleTarget.dataset.slot);
      const roleData = assignPlayerWithRoleTarget.dataset.role;
      const role = (roleData && roleData.trim() !== '') ? roleData : null;
      assignPlayerToLineup(playerId, slotIndex, role);
    }

    // New action: replace player in a filled slot
    const replacePlayerTarget = e.target.closest('[data-action="replace-player"]');
    if (replacePlayerTarget) {
      const playerId = parseInt(replacePlayerTarget.dataset.player);
      const slotIndex = parseInt(replacePlayerTarget.dataset.slot);
      const roleData = replacePlayerTarget.dataset.role;
      const role = (roleData && roleData.trim() !== '') ? roleData : null;
      replacePlayer(playerId, slotIndex, role);
    }

    const playerModal = document.getElementById('player-details-modal');
    if (playerModal && e.target === playerModal) closePlayerDetailsModal();
  });
}

function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === name));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === name));
}

// Player form handling
function handleAddPlayer(e) {
  e.preventDefault();
  const selected = Array.from(document.querySelectorAll('input[name="position"]:checked')).map(i => i.value);
  if (!selected.length) { alert(t('playerForm.selectPosition')); return; }
  const player = {
    id: state.editingPlayerId || Date.now(),
    name: document.getElementById('player-name').value,
    positions: selected,
    position: selected[0],
    attributes: collectAttributes()
  };
  if (getPlayerPositions(player).includes('GK')) addGKAttributes(player);
  if (state.editingPlayerId) {
    const idx = state.players.findIndex(p => p.id === state.editingPlayerId);
    if (idx !== -1) state.players[idx] = player;
    state.editingPlayerId = null;
  } else state.players.push(player);
  saveData();
  e.target.reset();
  updateFormTitle();
  switchTab('squad');
  renderSquad();
  renderLineup();
}

function collectAttributes() {
  const ids = ['aerial','crossing','dribbling','passing','shooting','tackling','technique','creativity','decisions','movement','aggression','positioning','teamwork','pace','stamina','strength','leadership'];
  const obj = {}; ids.forEach(id => obj[id] = parseInt(document.getElementById(`attr-${id}`).value));
  return obj;
}
function addGKAttributes(player) {
  ['agility','handling','kicking','reflexes','throwing'].forEach(a => {
    player.attributes[a] = parseInt(document.getElementById(`attr-${a}`).value);
  });
}

function updateFormTitle() {
  const h2 = document.querySelector('#add-player .section-header h2');
  const btn = document.querySelector('#player-form button[type="submit"]');
  if (!h2 || !btn) return;
  if (state.editingPlayerId) { h2.textContent = t('playerForm.editTitle'); btn.textContent = t('playerForm.updatePlayer'); }
  else { h2.textContent = t('playerForm.title'); btn.textContent = t('playerForm.addPlayer'); }
}

// Import single player from JSON and pre-fill the form
function handleImportJsonPlayer() {
  const textarea = document.getElementById('import-json-textarea');
  const messageDiv = document.getElementById('import-message');
  
  if (!textarea || !textarea.value.trim()) {
    showImportMessage(messageDiv, t('playerForm.jsonEmpty'), 'error');
    return;
  }
  
  try {
    const data = JSON.parse(textarea.value);
    
    // Validate required fields
    if (!data.name || typeof data.name !== 'string') {
      showImportMessage(messageDiv, t('playerForm.jsonMissingName'), 'error');
      return;
    }
    if (!data.positions || !Array.isArray(data.positions) || data.positions.length === 0) {
      showImportMessage(messageDiv, t('playerForm.jsonMissingPositions'), 'error');
      return;
    }
    if (!data.attributes || typeof data.attributes !== 'object') {
      showImportMessage(messageDiv, t('playerForm.jsonMissingAttributes'), 'error');
      return;
    }
    
    // Pre-fill the form
    document.getElementById('player-name').value = data.name;
    
    // Clear all position checkboxes first, then check the matching ones
    document.querySelectorAll('input[name="position"]').forEach(input => {
      input.checked = data.positions.includes(input.value);
    });
    
    // Fill in standard attributes (case-insensitive)
    const standardAttrs = ['aerial','crossing','dribbling','passing','shooting','tackling','technique','creativity','decisions','movement','aggression','positioning','teamwork','pace','stamina','strength','leadership'];
    const attrMap = {};
    Object.keys(data.attributes).forEach(key => {
      attrMap[key.toLowerCase()] = data.attributes[key];
    });
    
    standardAttrs.forEach(attr => {
      const el = document.getElementById(`attr-${attr}`);
      if (el && attrMap[attr] !== undefined) {
        el.value = attrMap[attr];
        updateAttributeColor.call(el);
      }
    });
    
    // Fill GK attributes if player is a goalkeeper
    if (data.positions.includes('GK')) {
      const gkAttrs = ['agility','handling','kicking','reflexes','throwing'];
      gkAttrs.forEach(attr => {
        const el = document.getElementById(`attr-${attr}`);
        if (el && attrMap[attr] !== undefined) {
          el.value = attrMap[attr];
          updateAttributeColor.call(el);
        }
      });
    }
    
    // Show/hide GK attributes section based on position
    toggleGKAttributes();
    
    // Clear textarea and show success message
    textarea.value = '';
    showImportMessage(messageDiv, t('playerForm.jsonSuccess', { name: data.name }), 'success');
    
  } catch (e) {
    console.error('JSON parse error:', e);
    showImportMessage(messageDiv, t('playerForm.jsonParseError'), 'error');
  }
}

function showImportMessage(div, message, type) {
  if (!div) return;
  div.textContent = message;
  div.className = `import-message ${type}`;
  setTimeout(() => { div.textContent = ''; div.className = 'import-message'; }, 5000);
}

// Lineup operations
function addToLineup(playerId) {
  const player = state.players.find(p => p.id === playerId); if (!player) return;
  const isCustom = state.currentFormation === 'Custom';
  const formationDef = formations[state.currentFormation];
  
  // Check if lineup is already full (11 players for custom formation)
  // Count only players in selectable slots
  if (isCustom) {
    const selectablePlayerCount = state.lineup.filter(assignment => {
      const slot = formationDef[assignment.slotIndex];
      return slot && slot.selectable !== false;
    }).length;
    
    if (selectablePlayerCount >= 11) {
      alert(t('lineupSection.maxPlayersReached'));
      return;
    }
  }
  
  const available = formationDef.map((slot,i)=>({ ...slot, index:i }))
    .filter(slot => {
      // Filter out non-selectable slots in custom formation
      if (isCustom && slot.selectable === false) return false;
      // Filter out slots without a valid position
      if (!slot.position) return false;
      return !state.lineup.find(l => l.slotIndex === slot.index) && getPlayerPositions(player).includes(slot.position);
    });
  if (!available.length) { alert(t('lineupSection.noAvailablePosition')); return; }
  if (available.length === 1) { state.lineup.push({ slotIndex: available[0].index, playerId }); saveData(); renderLineup(); return; }
  showPositionModal(player, available);
}

function assignToSlot(playerId, slotIndex) {
  const isCustom = state.currentFormation === 'Custom';
  const formationDef = formations[state.currentFormation];
  
  // Check if lineup is already full (11 players for custom formation)
  // Count only players in selectable slots
  if (isCustom) {
    const selectablePlayerCount = state.lineup.filter(assignment => {
      const slot = formationDef[assignment.slotIndex];
      return slot && slot.selectable !== false;
    }).length;
    
    if (selectablePlayerCount >= 11) {
      alert(t('lineupSection.maxPlayersReached'));
      closeModal();
      return;
    }
  }
  
  const position = formationDef[slotIndex].position;
  const roles = positionRoles[position] || [];
  if (!roles.length) { assignPlayerToLineup(playerId, slotIndex); return; }
  showRoleSelectionModal(playerId, slotIndex, position, roles);
}

function assignWithRole(playerId, slotIndex, role) {
  assignPlayerToLineup(playerId, slotIndex, role);
}

// Helper function to reduce code duplication
function assignPlayerToLineup(playerId, slotIndex, role = null) {
  const assignment = { slotIndex, playerId };
  if (role) assignment.role = role;
  state.lineup.push(assignment);
  saveData();
  renderLineup();
  closeModal();
}

function changeRole(slotIndex, position) {
  const assignment = state.lineup.find(l => l.slotIndex === slotIndex); if (!assignment) return;
  const roles = positionRoles[position] || []; if (!roles.length) return;
  showRoleSelectionModal(assignment.playerId, slotIndex, position, roles);
}

function updateRole(slotIndex, role) {
  const assignment = state.lineup.find(l => l.slotIndex === slotIndex); if (!assignment) return;
  assignment.role = role; saveData(); renderLineup(); closeModal();
}

function removeFromLineup(slotIndex) {
  state.lineup = state.lineup.filter(l => l.slotIndex !== slotIndex); saveData(); renderLineup();
}

function clearLineup() {
  if (state.lineup.length === 0) return;
  if (!window.confirm(t('lineupSection.clearConfirm'))) return;
  state.lineup = [];
  state.swapMode = false;
  state.firstSwapSlotIndex = null;
  saveData();
  renderLineup();
}

// Slot interactions
function handleSlotClick(slotIndex, position) {
  if (state.swapMode) startSwapMode(slotIndex); else changeRole(slotIndex, position);
}

function selectPlayerForSlot(slotIndex, position) {
  const isCustom = state.currentFormation === 'Custom';
  const formationDef = formations[state.currentFormation];
  
  // Check if lineup is already full (11 players for custom formation)
  // Count only players in selectable slots
  if (isCustom) {
    const selectablePlayerCount = state.lineup.filter(assignment => {
      const slot = formationDef[assignment.slotIndex];
      return slot && slot.selectable !== false;
    }).length;
    
    if (selectablePlayerCount >= 11) {
      alert(t('lineupSection.maxPlayersReached'));
      return;
    }
  }
  
  // NEW FLOW: First select role, then select player with role-specific rating
  const roles = positionRoles[position] || [];
  
  // If there are no roles for this position, show players directly
  if (!roles.length) {
    showPlayerListForSlot(slotIndex, position, null);
    return;
  }
  
  // Show role selection first
  showRoleSelectionForSlot(slotIndex, position, roles);
}

// New function to show role selection first
function showRoleSelectionForSlot(slotIndex, position, roles) {
  const modal = createModal();
  const content = modal.querySelector('.modal-content');
  const translatedPosition = translatePosition(position);
  content.innerHTML = `<div class="modal-header"><h3>${t('modals.selectRoleForPosition', { position: translatedPosition })}</h3><button class="modal-close" data-action="close-modal">×</button></div>
    <div class="modal-player-list">${roles.map(role => `<div class="modal-player-item" data-action="select-role-for-slot" data-slot="${slotIndex}" data-position="${position}" data-role="${role}"><div class="modal-player-name">${translateRole(role)}</div></div>`).join('')}</div>`;
  document.body.appendChild(modal); modal.classList.add('active');
}

// New function to show player list with role-specific rating
function showPlayerListForSlot(slotIndex, position, role) {
  const available = state.players.filter(p => getPlayerPositions(p).includes(position) && !state.lineup.find(l => l.playerId === p.id));
  const translatedPosition = translatePosition(position);
  if (!available.length) { 
    alert(t('lineupSection.noAvailablePlayers', { position: translatedPosition })); 
    return; 
  }
  
  // Calculate ratings once and store with player data for efficiency
  const playersWithRatings = available.map(player => {
    const rating = role ? calculateRating(player, position, role) : calculateRating(player);
    return {
      player,
      rating,
      ratingValue: parseFloat(rating)
    };
  });
  
  // Sort by rating value
  playersWithRatings.sort((a, b) => b.ratingValue - a.ratingValue);
  
  const modal = createModal();
  const content = modal.querySelector('.modal-content');
  const translatedRole = role ? translateRole(role) : '';
  const modalTitle = role ? t('modals.selectPlayerWithRole', { position: translatedPosition, role: translatedRole }) : t('modals.selectPlayer', { position: translatedPosition });
  
  // Create player items HTML
  const renderPlayerItems = (players) => {
    return players.map(({ player, rating }) => {
      const playerPositions = getPlayerPositions(player).map(p => translatePosition(p)).join(', ');
      return `<div class="modal-player-item" data-action="assign-player-with-role" data-player="${player.id}" data-slot="${slotIndex}" data-role="${role || ''}" data-player-name="${player.name.toLowerCase()}"><div class="modal-player-name">${player.name}</div><div class="modal-player-info"><span>${playerPositions}</span><span>${t('squadSection.rating')}: ${rating}</span></div></div>`;
    }).join('');
  };
  
  content.innerHTML = `<div class="modal-header"><h3>${modalTitle}</h3><button class="modal-close" data-action="close-modal">×</button></div>
    <div class="modal-search-container">
      <input type="text" class="modal-search-input" placeholder="${t('modals.searchPlaceholder')}" autocomplete="off">
    </div>
    <div class="modal-player-list">${renderPlayerItems(playersWithRatings)}</div>`;
  document.body.appendChild(modal); 
  modal.classList.add('active');
  
  // Add search functionality
  const searchInput = content.querySelector('.modal-search-input');
  const playerList = content.querySelector('.modal-player-list');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      const playerItems = playerList.querySelectorAll('.modal-player-item');
      
      playerItems.forEach(item => {
        const playerName = item.dataset.playerName || '';
        if (playerName.includes(searchTerm)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
    
    // Focus the search input after modal is rendered for better UX
    // Small delay ensures modal is fully visible before focusing
    setTimeout(() => searchInput.focus(), 100);
  }
}

// Swap logic
function startSwapMode(slotIndex) {
  if (!state.swapMode) { state.swapMode=true; state.firstSwapSlotIndex=slotIndex; renderLineup(); }
  else {
    if (state.firstSwapSlotIndex !== slotIndex) swapPlayers(state.firstSwapSlotIndex, slotIndex);
    state.swapMode=false; state.firstSwapSlotIndex=null; renderLineup();
  }
}
function swapPlayers(a,b) {
  const as1 = state.lineup.find(l => l.slotIndex === a);
  const as2 = state.lineup.find(l => l.slotIndex === b);
  if (!as1 || !as2) return;
  const formationDef = formations[state.currentFormation];
  const pos1 = formationDef[a].position; const pos2 = formationDef[b].position;
  const p1 = state.players.find(p => p.id === as1.playerId); const p2 = state.players.find(p => p.id === as2.playerId);
  if (!p1 || !p2) return;
  const can1 = getPlayerPositions(p1).includes(pos2); const can2 = getPlayerPositions(p2).includes(pos1);
  if (!can1 || !can2) { alert(t('lineupSection.swapInvalid')); return; }
  as1.slotIndex = b; as2.slotIndex = a; saveData(); renderLineup();
}

function movePlayerToEmptySlot(fromSlotIndex, toSlotIndex, targetPosition) {
  const assignment = state.lineup.find(l => l.slotIndex === fromSlotIndex);
  if (!assignment) return;
  const player = state.players.find(p => p.id === assignment.playerId);
  if (!player) return;
  if (!getPlayerPositions(player).includes(targetPosition)) {
    alert(t('lineupSection.playerCannotPlay'));
    return;
  }
  assignment.slotIndex = toSlotIndex;
  saveData();
  renderLineup();
}

// Drag & drop (simplified as potential future enhancement)
export function enableDragAndDrop() {/* Placeholder: existing inline handlers replaced by delegation if needed */}

// Player editing
function editPlayer(id) {
  const player = state.players.find(p => p.id === id); if (!player) return;
  state.editingPlayerId = id;
  document.getElementById('player-name').value = player.name;
  document.querySelectorAll('input[name="position"]').forEach(inp => { inp.checked = getPlayerPositions(player).includes(inp.value); });
  const attrs = player.attributes;
  Object.keys(attrs).forEach(key => { 
    const el = document.getElementById(`attr-${key}`); 
    if (el) {
      el.value = attrs[key];
      updateAttributeColor.call(el);
    }
  });
  // GK attributes
  if (getPlayerPositions(player).includes('GK')) {
    ['agility','handling','kicking','reflexes','throwing'].forEach(a => {
      const el = document.getElementById(`attr-${a}`);
      if (el && player.attributes[a]) {
        el.value = player.attributes[a];
        updateAttributeColor.call(el);
      }
    });
  }
  toggleGKAttributes();
  updateFormTitle(); switchTab('add-player');
}

function deletePlayer(id) {
  if (!window.confirm(t('squadSection.deleteConfirm'))) return;
  state.players = state.players.filter(p => p.id !== id);
  state.lineup = state.lineup.filter(l => l.playerId !== id);
  saveData(); renderSquad(); renderLineup();
}

function toggleGKAttributes() {
  const selectedPositions = Array.from(document.querySelectorAll('input[name="position"]:checked')).map(i => i.value);
  const gkSection = document.getElementById('gk-attributes');
  if (gkSection) gkSection.style.display = selectedPositions.includes('GK') ? 'block' : 'none';
}

function setupAttributeColorCoding() {
  const attributeInputs = document.querySelectorAll('input[type="number"][id^="attr-"]');
  attributeInputs.forEach(input => {
    input.addEventListener('input', updateAttributeColor);
    updateAttributeColor.call(input);
  });
}

function updateAttributeColor() {
  const value = parseInt(this.value);
  this.classList.remove('attr-value-1-4', 'attr-value-5-9', 'attr-value-10-14', 'attr-value-15-20');
  if (value >= 1 && value <= 4) this.classList.add('attr-value-1-4');
  else if (value >= 5 && value <= 9) this.classList.add('attr-value-5-9');
  else if (value >= 10 && value <= 14) this.classList.add('attr-value-10-14');
  else if (value >= 15 && value <= 20) this.classList.add('attr-value-15-20');
}

// New handlers for separate role and player name clicks
function handleRoleClick(playerId, slotIndex, position) {
  showRoleChangeModal(playerId, slotIndex, position);
}

function handlePlayerNameClick(slotIndex, position, currentRole) {
  showPlayerChangeModal(slotIndex, position, currentRole);
}

function replacePlayer(playerId, slotIndex, role) {
  // Update the existing assignment with the new player, maintaining or updating the role
  const assignment = state.lineup.find(l => l.slotIndex === slotIndex);
  if (!assignment) return;
  
  assignment.playerId = playerId;
  // Maintain the existing role if no new role is provided
  if (role !== null && role !== undefined && role !== '') {
    assignment.role = role;
  }
  
  saveData();
  renderLineup();
  closeModal();
}

// Expose functions for window binding in main.js
export const exposed = { assignToSlot, assignWithRole, updateRole, removeFromLineup, addToLineup, editPlayer, deletePlayer, selectPlayerForSlot, handleSlotClick, viewPlayerDetails, startSwapMode, changeRole, toggleGKAttributes, closePlayerDetailsModal, showPlayerListForSlot, showRoleSelectionForSlot, handleRoleClick, handlePlayerNameClick, replacePlayer };
