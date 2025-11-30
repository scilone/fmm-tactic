import { state } from '../models/state.js';
import { getPlayerPositions } from '../models/state.js';
import { calculateRating } from '../services/rating.js';
import { t, translatePosition } from '../config/i18n.js';

export function renderSquad() {
  const squadList = document.getElementById('squad-list');
  if (!squadList) return;
  const searchTerm = (document.getElementById('search-player')?.value || '').toLowerCase();
  const positionFilter = document.getElementById('position-filter')?.value || 'all';

  let filtered = state.players.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm);
    const matchesPos = positionFilter === 'all' || getPlayerPositions(p).includes(positionFilter);
    return matchesSearch && matchesPos;
  });

  filtered.sort((a,b) => parseFloat(calculateRating(b)) - parseFloat(calculateRating(a)));

  const countEl = document.getElementById('squad-count');
  if (countEl) {
    const count = filtered.length;
    countEl.textContent = count === 1 ? t('squadSection.playersCount', { count }) : t('squadSection.playersCountPlural', { count });
  }

  if (filtered.length === 0) {
    squadList.innerHTML = `<div class="empty-state"><h3>${t('squadSection.noPlayersFound')}</h3><p>${t('squadSection.addPlayersToStart')}</p></div>`;
    return;
  }

  squadList.innerHTML = filtered.map(player => {
    const playerPositions = getPlayerPositions(player).map(p => translatePosition(p)).join(', ');
    return `
    <div class="player-card" data-action="view-details" data-id="${player.id}">
      <div class="player-card-header">
        <span class="player-name">${player.name}</span>
        <span class="player-position">${playerPositions}</span>
      </div>
      <div class="player-rating">${t('squadSection.rating')}: ${calculateRating(player)}</div>
      <div class="player-actions">
        <button class="btn btn-secondary btn-small" data-action="edit-player" data-id="${player.id}">${t('squadSection.edit')}</button>
        <button class="btn btn-danger btn-small" data-action="delete-player" data-id="${player.id}">${t('squadSection.delete')}</button>
      </div>
    </div>`;
  }).join('');
}