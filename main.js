// Entry point after refactor
import { state } from './models/state.js';
import { loadData, saveData } from './services/storage.js';
import { setupEventListeners, exposed } from './ui/events.js';
import { renderSquad } from './ui/renderSquad.js';
import { renderLineup } from './ui/renderLineup.js';
import { loadLanguage } from './config/i18n.js';
import { updateUILanguage } from './ui/languageSwitcher.js';

window.addEventListener('DOMContentLoaded', () => {
  loadLanguage();
  loadData();
  setupEventListeners();
  updateUILanguage();
  renderSquad();
  renderLineup();
});

// Attach exposed functions needed by inline or delegated handlers (future cleanup)
Object.assign(window, exposed, { saveData });