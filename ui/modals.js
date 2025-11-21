import { calculateRating } from '../services/rating.js';
import { getPlayerPositions, state } from '../models/state.js';
import { positionRoles } from '../config/roles.js';

export function createModal() {
  const existing = document.querySelector('.modal');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.onclick = (e) => { if (e.target === modal) closeModal(); };
  const content = document.createElement('div');
  content.className = 'modal-content';
  modal.appendChild(content);
  return modal;
}

export function closeModal() {
  const modal = document.querySelector('.modal');
  if (modal) modal.remove();
}

export function showPositionModal(player, slots, assignFn) {
  const modal = createModal();
  const content = modal.querySelector('.modal-content');
  content.innerHTML = `<div class="modal-header"><h3>Select Position for ${player.name}</h3><button class="modal-close" data-action="close-modal">×</button></div>
    <div class="modal-player-list">${slots.map(slot => `<div class="modal-player-item" data-action="assign-slot" data-player="${player.id}" data-slot="${slot.index}"><div class="modal-player-name">${slot.label}</div></div>`).join('')}</div>`;
  document.body.appendChild(modal); modal.classList.add('active');
}

export function showRoleSelectionModal(playerId, slotIndex, position, roles, assignRoleFn) {
  const player = state.players.find(p => p.id === playerId);
  if (!player) return;
  const modal = createModal();
  const content = modal.querySelector('.modal-content');
  content.innerHTML = `<div class="modal-header"><h3>Select Role for ${player.name}</h3><button class="modal-close" data-action="close-modal">×</button></div>
    <div class="modal-player-list">${roles.map(role => `<div class="modal-player-item" data-action="assign-role" data-player="${playerId}" data-slot="${slotIndex}" data-role="${role}"><div class="modal-player-name">${role}</div></div>`).join('')}</div>`;
  document.body.appendChild(modal); modal.classList.add('active');
}

export function viewPlayerDetails(playerId) {
  const player = state.players.find(p => p.id === playerId);
  if (!player) return;
  const modal = document.getElementById('player-details-modal');
  if (!modal) return;
  const modalPlayerName = document.getElementById('modal-player-name');
  const modalDetails = document.getElementById('modal-player-details');
  modalPlayerName.textContent = `${player.name} - Position Ratings`;
  const playerPositions = getPlayerPositions(player);
  let detailsHTML = '';
  playerPositions.forEach(position => {
    const roles = positionRoles[position] || [];
    detailsHTML += `<div class="position-section"><div class="position-header">${position}</div><div class="roles-grid">`;
    roles.forEach(role => {
      const rating = calculateRating(player, position, role);
      detailsHTML += `<div class="role-card"><div class="role-name">${role}</div><div class="role-rating"><span class="rating-badge">${rating}</span></div></div>`;
    });
    detailsHTML += `</div></div>`;
  });
  modalDetails.innerHTML = detailsHTML;
  modal.classList.add('active');
}

export function closePlayerDetailsModal() {
  const modal = document.getElementById('player-details-modal');
  if (modal) modal.classList.remove('active');
}