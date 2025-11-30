import { calculateRating } from '../services/rating.js';
import { getPlayerPositions, state } from '../models/state.js';
import { positionRoles } from '../config/roles.js';
import { t, translateRole, translatePosition } from '../config/i18n.js';

export function createModal() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(m => {
    if (m.id !== 'player-details-modal') m.remove();
  });
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.onclick = (e) => { if (e.target === modal) closeModal(); };
  const content = document.createElement('div');
  content.className = 'modal-content';
  modal.appendChild(content);
  return modal;
}

export function closeModal() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (modal.id !== 'player-details-modal') {
      modal.remove();
    } else {
      modal.classList.remove('active');
    }
  });
}

export function showPositionModal(player, slots, assignFn) {
  const modal = createModal();
  const content = modal.querySelector('.modal-content');
  content.innerHTML = `<div class="modal-header"><h3>${t('modals.selectPositionFor', { name: player.name })}</h3><button class="modal-close" data-action="close-modal">×</button></div>
    <div class="modal-player-list">${slots.map(slot => `<div class="modal-player-item" data-action="assign-slot" data-player="${player.id}" data-slot="${slot.index}"><div class="modal-player-name">${translatePosition(slot.label)}</div></div>`).join('')}</div>`;
  document.body.appendChild(modal); modal.classList.add('active');
}

export function showRoleSelectionModal(playerId, slotIndex, position, roles, assignRoleFn) {
  const player = state.players.find(p => p.id === playerId);
  if (!player) return;
  const modal = createModal();
  const content = modal.querySelector('.modal-content');
  content.innerHTML = `<div class="modal-header"><h3>${t('modals.selectRoleFor', { name: player.name })}</h3><button class="modal-close" data-action="close-modal">×</button></div>
    <div class="modal-player-list">${roles.map(role => `<div class="modal-player-item" data-action="assign-role" data-player="${playerId}" data-slot="${slotIndex}" data-role="${role}"><div class="modal-player-name">${translateRole(role)}</div></div>`).join('')}</div>`;
  document.body.appendChild(modal); modal.classList.add('active');
}

export function viewPlayerDetails(playerId) {
  const player = state.players.find(p => p.id == playerId);
  if (!player) return;
  const modal = document.getElementById('player-details-modal');
  if (!modal) return;
  const modalPlayerName = document.getElementById('modal-player-name');
  const modalDetails = document.getElementById('modal-player-details');
  modalPlayerName.textContent = t('modals.positionRatings', { name: player.name });
  const playerPositions = getPlayerPositions(player);
  let detailsHTML = '';
  playerPositions.forEach(position => {
    const roles = positionRoles[position] || [];
    const translatedPosition = translatePosition(position);
    detailsHTML += `<div class="position-section"><div class="position-header">${translatedPosition}</div><div class="roles-grid">`;
    roles.forEach(role => {
      const rating = calculateRating(player, position, role);
      const ratingClass = rating >= 15 ? 'rating-excellent' : rating >= 10 ? 'rating-good' : rating >= 5 ? 'rating-average' : 'rating-poor';
      detailsHTML += `<div class="role-card"><div class="role-name">${translateRole(role)}</div><div class="role-rating"><span class="rating-badge ${ratingClass}">${rating}</span></div></div>`;
    });
    detailsHTML += `</div></div>`;
  });
  if (!detailsHTML) detailsHTML = `<p>${t('modals.noPositionData')}</p>`;
  modalDetails.innerHTML = detailsHTML;
  modal.classList.add('active');
}

export function closePlayerDetailsModal() {
  const modal = document.getElementById('player-details-modal');
  if (modal) modal.classList.remove('active');
}

export function showRoleChangeModal(playerId, slotIndex, position) {
  const player = state.players.find(p => p.id === playerId);
  if (!player) return;
  
  const roles = positionRoles[position] || [];
  if (!roles.length) {
    alert(t('modals.noRolesAvailable'));
    return;
  }
  
  const modal = createModal();
  const content = modal.querySelector('.modal-content');
  const translatedPosition = translatePosition(position);
  
  // Calculate ratings for all roles
  const rolesWithRatings = roles.map(role => {
    const rating = calculateRating(player, position, role);
    const ratingValue = parseFloat(rating);
    const ratingClass = ratingValue >= 15 ? 'rating-excellent' : ratingValue >= 10 ? 'rating-good' : ratingValue >= 5 ? 'rating-average' : 'rating-poor';
    return { role, rating, ratingValue, ratingClass };
  });
  
  content.innerHTML = `<div class="modal-header">
    <h3>${t('modals.selectRoleFor', { name: player.name })} (${translatedPosition})</h3>
    <button class="modal-close" data-action="close-modal">×</button>
  </div>
  <div class="modal-player-list">
    ${rolesWithRatings.map(({ role, rating, ratingClass }) => `
      <div class="modal-player-item" data-action="update-role" data-slot="${slotIndex}" data-role="${role}">
        <div class="modal-player-name">${translateRole(role)}</div>
        <div class="modal-player-info">
          <span class="rating-badge ${ratingClass}">${rating}</span>
        </div>
      </div>
    `).join('')}
  </div>`;
  
  document.body.appendChild(modal);
  modal.classList.add('active');
}

export function showPlayerChangeModal(slotIndex, position, currentRole) {
  const available = state.players.filter(p => {
    // Check if player can play in this position
    const canPlayPosition = getPlayerPositions(p).includes(position);
    // Check if player is not already in lineup
    const notInLineup = !state.lineup.find(l => l.playerId === p.id);
    return canPlayPosition && notInLineup;
  });
  
  const translatedPosition = translatePosition(position);
  
  if (!available.length) {
    alert(t('lineupSection.noAvailablePlayers', { position: translatedPosition }));
    return;
  }
  
  // Calculate ratings for the current role (or general rating if no role)
  const playersWithRatings = available.map(player => {
    const rating = currentRole ? calculateRating(player, position, currentRole) : calculateRating(player, position, null);
    const ratingValue = parseFloat(rating);
    const ratingClass = ratingValue >= 15 ? 'rating-excellent' : ratingValue >= 10 ? 'rating-good' : ratingValue >= 5 ? 'rating-average' : 'rating-poor';
    return {
      player,
      rating,
      ratingValue,
      ratingClass
    };
  });
  
  // Sort by rating value (highest first)
  playersWithRatings.sort((a, b) => b.ratingValue - a.ratingValue);
  
  const modal = createModal();
  const content = modal.querySelector('.modal-content');
  const translatedRole = currentRole ? translateRole(currentRole) : '';
  const modalTitle = currentRole ? t('modals.selectPlayerWithRole', { position: translatedPosition, role: translatedRole }) : t('modals.selectPlayer', { position: translatedPosition });
  
  content.innerHTML = `<div class="modal-header">
    <h3>${modalTitle}</h3>
    <button class="modal-close" data-action="close-modal">×</button>
  </div>
  <div class="modal-search-container">
    <input type="text" class="modal-search-input" placeholder="${t('modals.searchPlaceholder')}" autocomplete="off">
  </div>
  <div class="modal-player-list">
    ${playersWithRatings.map(({ player, rating, ratingClass }) => {
      const playerPositions = getPlayerPositions(player).map(p => translatePosition(p)).join(', ');
      return `
      <div class="modal-player-item" data-action="replace-player" data-player="${player.id}" data-slot="${slotIndex}" data-role="${currentRole || ''}" data-player-name="${player.name.toLowerCase()}">
        <div class="modal-player-name">${player.name}</div>
        <div class="modal-player-info">
          <span>${playerPositions}</span>
          <span class="rating-badge ${ratingClass}">${rating}</span>
        </div>
      </div>
    `;
    }).join('')}
  </div>`;
  
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
    
    // Focus the search input for better UX
    setTimeout(() => searchInput.focus(), 100);
  }
}