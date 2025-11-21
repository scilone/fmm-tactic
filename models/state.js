import { formations } from '../config/formations.js';

export const state = {
  players: [],
  lineup: [],
  currentFormation: '4-4-2',
  editingPlayerId: null,
  draggedSlotIndex: null,
  swapMode: false,
  firstSwapSlotIndex: null
};

export function getPlayerPositions(player) {
  if (!player) return [];
  if (Array.isArray(player.positions)) return player.positions;
  if (player.position) return [player.position];
  return [];
}

export function setFormation(value) {
  state.currentFormation = value;
}

export function getFormationDef() {
  return formations[state.currentFormation];
}