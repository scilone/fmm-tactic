import { state, getPlayerPositions } from '../models/state.js';
import { formations } from '../config/formations.js';
import { positionRoles } from '../config/roles.js';
import { renderSquad } from './renderSquad.js';
import { renderLineup } from './renderLineup.js';
import { calculateRating } from '../services/rating.js';
import { saveData } from '../services/storage.js';
import { exportData, importDataFile } from '../services/importExport.js';
import { createModal, showPositionModal, showRoleSelectionModal, viewPlayerDetails, closeModal, closePlayerDetailsModal } from './modals.js';

export function setupEventListeners() {
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
    if (removeBtn) { removeFromLineup(slotIndex); return; }
    if (swapBtn) { startSwapMode(slotIndex); return; }
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
  if (!selected.length) { alert('Please select at least one position'); return; }
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
  if (state.editingPlayerId) { h2.textContent='Edit Player'; btn.textContent='Update Player'; }
  else { h2.textContent='Add New Player'; btn.textContent='Add Player'; }
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
      alert('Custom formation can only have 11 players maximum.');
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
  if (!available.length) { alert('No available position for player'); return; }
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
      alert('Custom formation can only have 11 players maximum.');
      closeModal();
      return;
    }
  }
  
  const position = formationDef[slotIndex].position;
  const roles = positionRoles[position] || [];
  if (!roles.length) { state.lineup.push({ slotIndex, playerId }); saveData(); renderLineup(); closeModal(); return; }
  showRoleSelectionModal(playerId, slotIndex, position, roles);
}

function assignWithRole(playerId, slotIndex, role) {
  state.lineup.push({ slotIndex, playerId, role }); saveData(); renderLineup(); closeModal();
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
  if (!window.confirm('Remove all players from the lineup?')) return;
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
      alert('Custom formation can only have 11 players maximum.');
      return;
    }
  }
  
  const available = state.players.filter(p => getPlayerPositions(p).includes(position) && !state.lineup.find(l => l.playerId === p.id));
  if (!available.length) { alert(`No available ${position} players.`); return; }
  available.sort((a,b)=>parseFloat(calculateRating(b)) - parseFloat(calculateRating(a)));
  const modal = createModal();
  const content = modal.querySelector('.modal-content');
  content.innerHTML = `<div class="modal-header"><h3>Select ${position} Player</h3><button class="modal-close" data-action="close-modal">×</button></div>
    <div class="modal-player-list">${available.map(player => `<div class="modal-player-item" data-action="assign-slot" data-player="${player.id}" data-slot="${slotIndex}"><div class="modal-player-name">${player.name}</div><div class="modal-player-info"><span>${getPlayerPositions(player).join(', ')}</span><span>Rating: ${calculateRating(player)}</span></div></div>`).join('')}</div>`;
  document.body.appendChild(modal); modal.classList.add('active');
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
  if (!can1 || !can2) { alert('Swap invalid: position incompatibility.'); return; }
  as1.slotIndex = b; as2.slotIndex = a; saveData(); renderLineup();
}

function movePlayerToEmptySlot(fromSlotIndex, toSlotIndex, targetPosition) {
  const assignment = state.lineup.find(l => l.slotIndex === fromSlotIndex);
  if (!assignment) return;
  const player = state.players.find(p => p.id === assignment.playerId);
  if (!player) return;
  if (!getPlayerPositions(player).includes(targetPosition)) {
    alert('Player cannot play in this position.');
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
  if (!window.confirm('Delete player?')) return;
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

// Expose functions for window binding in main.js
export const exposed = { assignToSlot, assignWithRole, updateRole, removeFromLineup, addToLineup, editPlayer, deletePlayer, selectPlayerForSlot, handleSlotClick, viewPlayerDetails, startSwapMode, changeRole, toggleGKAttributes, closePlayerDetailsModal };
