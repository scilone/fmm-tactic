import { state } from '../models/state.js';
import { formations } from '../config/formations.js';
import { calculateRating } from '../services/rating.js';

export function updateTeamAverage() {
  const el = document.getElementById('team-avg');
  if (!el) return;
  if (state.lineup.length === 0) { el.textContent = '0.0'; return; }
  const formationDef = formations[state.currentFormation];
  const list = state.lineup.map(slot => {
    const player = state.players.find(p => p.id === slot.playerId);
    const position = formationDef[slot.slotIndex]?.position;
    return player ? calculateRating(player, position, slot.role) : null;
  }).filter(v => v !== null);
  if (list.length === 0) { el.textContent = '0.0'; return; }
  const avg = (list.reduce((s,v)=>s+parseFloat(v),0) / list.length).toFixed(1);
  el.textContent = avg;
}