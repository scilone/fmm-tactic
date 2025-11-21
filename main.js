// Entry point after refactor
import { state } from './models/state.js';
import { loadData, saveData } from './services/storage.js';
import { setupEventListeners, exposed } from './ui/events.js';
import { renderSquad } from './ui/renderSquad.js';
import { renderLineup } from './ui/renderLineup.js';

window.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupEventListeners();
  renderSquad();
  renderLineup();
});

// Attach exposed functions needed by inline or delegated handlers (future cleanup)
Object.assign(window, exposed, { saveData });