import { state } from '../models/state.js';

export function saveData() {
  localStorage.setItem('fmm-players', JSON.stringify(state.players));
  localStorage.setItem('fmm-lineup', JSON.stringify(state.lineup));
  localStorage.setItem('fmm-formation', state.currentFormation);
}

export function loadData() {
  const savedPlayers = localStorage.getItem('fmm-players');
  const savedLineup = localStorage.getItem('fmm-lineup');
  const savedFormation = localStorage.getItem('fmm-formation');

  if (savedPlayers) state.players = JSON.parse(savedPlayers);
  if (savedLineup) state.lineup = JSON.parse(savedLineup);
  if (savedFormation) state.currentFormation = savedFormation;
}