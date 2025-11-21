import { state } from '../models/state.js';
import { formations } from '../config/formations.js';
import { calculateRating } from '../services/rating.js';
import { updateTeamAverage } from './teamAverage.js';

export function renderLineup() {
  const pitch = document.getElementById('pitch');
  if (!pitch) return;
  const formationDef = formations[state.currentFormation];
  const isCustom = state.currentFormation === 'Custom';
  
  // Check if we have more than 11 players selected in custom formation
  if (isCustom && state.lineup.length > 11) {
    // Remove excess players (keep first 11)
    const removed = state.lineup.length - 11;
    state.lineup = state.lineup.slice(0, 11);
    console.warn(`Custom formation limited to 11 players. Removed ${removed} player(s).`);
  }

  const rows = {};
  formationDef.forEach((slot, index) => { if (!rows[slot.row]) rows[slot.row] = []; rows[slot.row].push({ ...slot, index }); });

  const rowsHTML = Object.keys(rows).sort((a,b)=>b-a).map(rowNum => {
    const rowSlots = rows[rowNum];
    const slotsHTML = rowSlots.map(slot => {
      // Handle non-selectable slots for custom formation
      if (isCustom && slot.selectable === false) {
        return `<div class="position-slot non-selectable" data-slot-index="${slot.index}">
          <div class="position-label"></div>
        </div>`;
      }
      
      const assignment = state.lineup.find(l => l.slotIndex === slot.index);
      const player = assignment ? state.players.find(p => p.id === assignment.playerId) : null;
      if (player) {
        const role = assignment.role || '';
        const roleDisplay = role ? `<div class="position-role">${role}</div>` : '';
        const rating = calculateRating(player, slot.position, role);
        return `<div class="position-slot filled" draggable="true" data-slot-index="${slot.index}" data-position="${slot.position}">
          <div class="position-label">${slot.label}</div>
          <div class="position-player">${player.name}</div>
          ${roleDisplay}
          <div class="position-rating">${rating}</div>
          <button class="position-remove" data-action="remove-slot" data-slot="${slot.index}">Remove</button>
          <button class="position-swap" data-action="swap-slot" data-slot="${slot.index}">↔️ Swap</button>
        </div>`;
      }
      return `<div class="position-slot" data-slot-index="${slot.index}" data-position="${slot.position}">
        <div class="position-label">${slot.label}</div>
        <div style="color: white; margin-top: 10px;">+</div>
      </div>`;
    }).join('');
    return `<div class="pitch-row ${isCustom ? 'pitch-row-custom' : ''}">${slotsHTML}</div>`;
  }).join('');

  pitch.innerHTML = `<div class="pitch-positions ${isCustom ? 'pitch-custom' : ''}">${rowsHTML}</div>`;
  updateTeamAverage();

  if (state.swapMode && state.firstSwapSlotIndex !== null) {
    const firstSlot = document.querySelector(`[data-slot-index="${state.firstSwapSlotIndex}"]`);
    if (firstSlot) firstSlot.classList.add('swap-selected');
  }
}