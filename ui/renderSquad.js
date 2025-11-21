import { state } from '../models/state.js';
import { getPlayerPositions } from '../models/state.js';
import { calculateRating } from '../services/rating.js';

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
  if (countEl) countEl.textContent = `${filtered.length} player${filtered.length !== 1 ? 's' : ''}`;

  if (filtered.length === 0) {
    squadList.innerHTML = `<div class="empty-state"><h3>No players found</h3><p>Add players to your squad to get started!</p></div>`;
    return;
  }

  squadList.innerHTML = filtered.map(player => `
    <div class="player-card" data-action="view-details" data-id="${player.id}">
      <div class="player-card-header">
        <span class="player-name">${player.name}</span>
        <span class="player-position">${getPlayerPositions(player).join(', ')}</span>
      </div>
      <div class="player-rating">Rating: ${calculateRating(player)}</div>
      <div class="player-actions">
        <button class="btn btn-secondary btn-small" data-action="edit-player" data-id="${player.id}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-player" data-id="${player.id}">Delete</button>
      </div>
    </div>`).join('');
}