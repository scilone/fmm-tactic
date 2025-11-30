import { getCurrentLanguage, setLanguage, t, translateAttribute, translatePosition, translatePositionName } from '../config/i18n.js';
import { renderSquad } from './renderSquad.js';
import { renderLineup } from './renderLineup.js';

// Update all UI elements with translations
export function updateUILanguage() {
  const lang = getCurrentLanguage();
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update header
  const titleEl = document.querySelector('header h1');
  if (titleEl) titleEl.innerHTML = `⚽ ${t('appTitle')}`;
  
  const subtitleEl = document.querySelector('header .subtitle');
  if (subtitleEl) subtitleEl.textContent = t('appSubtitle');
  
  // Update tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const tab = btn.dataset.tab;
    if (tab === 'squad') btn.textContent = t('tabs.squad');
    if (tab === 'lineup') btn.textContent = t('tabs.lineup');
    if (tab === 'add-player') btn.textContent = t('tabs.addPlayer');
  });
  
  // Update squad section
  const squadTitle = document.querySelector('#squad .section-header h2');
  if (squadTitle) squadTitle.textContent = t('squadSection.title');
  
  const exportBtn = document.getElementById('export-data-btn');
  if (exportBtn) exportBtn.innerHTML = `💾 ${t('squadSection.exportData')}`;
  
  const importBtn = document.getElementById('import-data-btn');
  if (importBtn) importBtn.innerHTML = `📂 ${t('squadSection.importData')}`;
  
  // Update position filter
  updatePositionFilter();
  
  // Update search placeholder
  const searchInput = document.getElementById('search-player');
  if (searchInput) searchInput.placeholder = t('squadSection.searchPlaceholder');
  
  // Update lineup section
  const lineupTitle = document.querySelector('#lineup .section-header h2');
  if (lineupTitle) lineupTitle.textContent = t('lineupSection.title');
  
  const formationLabel = document.querySelector('.formation-selector label[for="formation"]');
  if (formationLabel) formationLabel.textContent = `${t('lineupSection.formation')}:`;
  
  const clearBtn = document.getElementById('clear-lineup-btn');
  if (clearBtn) clearBtn.innerHTML = `🗑️ ${t('lineupSection.clear')}`;
  
  const avgRatingLabel = document.querySelector('.average-rating h3');
  if (avgRatingLabel) {
    const avgSpan = avgRatingLabel.querySelector('span');
    const avgValue = avgSpan ? avgSpan.textContent : '0.0';
    avgRatingLabel.innerHTML = `${t('lineupSection.teamAvgRating')}: <span id="team-avg">${avgValue}</span>`;
  }
  
  // Update add player section
  updatePlayerFormLabels();
  
  // Update language switcher button text
  updateLanguageSwitcherText();
}

// Update position filter dropdown
function updatePositionFilter() {
  const filter = document.getElementById('position-filter');
  if (!filter) return;
  
  // Store current value
  const currentValue = filter.value;
  
  // Position codes in order
  const positionCodes = ['GK', 'DL', 'DC', 'DR', 'WBL', 'DMC', 'WBR', 'ML', 'MC', 'MR', 'AML', 'AMC', 'AMR', 'ST'];
  
  filter.innerHTML = `<option value="all">${t('squadSection.allPositions')}</option>`;
  
  positionCodes.forEach(code => {
    const translatedCode = translatePosition(code);
    const translatedName = translatePositionName(code);
    const option = document.createElement('option');
    option.value = code;
    option.textContent = `${translatedCode} - ${translatedName}`;
    filter.appendChild(option);
  });
  
  // Restore selection
  filter.value = currentValue;
}

// Update player form labels
function updatePlayerFormLabels() {
  // Form title
  const formTitle = document.querySelector('#add-player .section-header h2');
  if (formTitle) {
    const isEditing = formTitle.textContent.includes('Edit');
    formTitle.textContent = isEditing ? t('playerForm.editTitle') : t('playerForm.title');
  }
  
  // Name label
  const nameLabel = document.querySelector('label[for="player-name"]');
  if (nameLabel) nameLabel.textContent = `${t('playerForm.name')} *`;
  
  // Position label
  const positionLabel = document.querySelector('label[for="player-position"]');
  if (positionLabel) positionLabel.textContent = `${t('playerForm.position')} *`;
  
  // Attribute section headers (using data-i18n attribute)
  const attrHeaders = document.querySelectorAll('#player-form h3[data-i18n]');
  attrHeaders.forEach(h3 => {
    const key = h3.dataset.i18n;
    if (key) {
      h3.textContent = t(key);
    }
  });
  
  // Attribute labels
  const attrLabels = document.querySelectorAll('.attributes-grid label, #gk-attributes label');
  attrLabels.forEach(label => {
    const forAttr = label.getAttribute('for');
    if (forAttr && forAttr.startsWith('attr-')) {
      const attrKey = forAttr.replace('attr-', '');
      label.textContent = translateAttribute(attrKey);
    }
  });
  
  // Form buttons
  const submitBtn = document.querySelector('#player-form button[type="submit"]');
  if (submitBtn) {
    const isEditing = submitBtn.textContent.includes('Update');
    submitBtn.textContent = isEditing ? t('playerForm.updatePlayer') : t('playerForm.addPlayer');
  }
  
  const cancelBtn = document.getElementById('cancel-btn');
  if (cancelBtn) cancelBtn.textContent = t('playerForm.cancel');
  
  // JSON import section
  const jsonLabel = document.querySelector('label[for="import-json-textarea"]');
  if (jsonLabel) jsonLabel.innerHTML = `📋 ${t('playerForm.pasteJson')}`;
  
  const jsonTextarea = document.getElementById('import-json-textarea');
  if (jsonTextarea) jsonTextarea.placeholder = t('playerForm.jsonPlaceholder');
  
  const jsonBtn = document.getElementById('import-json-btn');
  if (jsonBtn) jsonBtn.textContent = t('playerForm.importFromJson');
}

// Update language switcher button text
function updateLanguageSwitcherText() {
  const btn = document.getElementById('language-switcher');
  if (btn) {
    const lang = getCurrentLanguage();
    btn.textContent = lang === 'en' ? '🇫🇷 FR' : '🇬🇧 EN';
    btn.title = lang === 'en' ? 'Switch to French' : 'Passer en Anglais';
  }
}

// Create language switcher element
export function createLanguageSwitcher() {
  // Check if it already exists
  if (document.getElementById('language-switcher')) return;
  
  const header = document.querySelector('header');
  if (!header) return;
  
  const switcher = document.createElement('button');
  switcher.id = 'language-switcher';
  switcher.className = 'btn btn-secondary language-btn';
  
  const lang = getCurrentLanguage();
  switcher.textContent = lang === 'en' ? '🇫🇷 FR' : '🇬🇧 EN';
  switcher.title = lang === 'en' ? 'Switch to French' : 'Passer en Anglais';
  
  switcher.addEventListener('click', () => {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'en' ? 'fr' : 'en';
    setLanguage(newLang);
    updateUILanguage();
    renderSquad();
    renderLineup();
  });
  
  header.appendChild(switcher);
}

// Setup language switcher (called from events.js)
export function setupLanguageSwitcher() {
  createLanguageSwitcher();
}
