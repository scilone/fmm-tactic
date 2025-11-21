import { state } from '../models/state.js';
import { saveData } from './storage.js';

export function exportData() {
  try {
    const exportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      data: {
        players: state.players,
        lineup: state.lineup,
        formation: state.currentFormation
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fmm-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showBackupMessage('✓ Data exported successfully!', 'success');
  } catch (e) {
    console.error(e);
    showBackupMessage('Error exporting data. Please try again.', 'error');
  }
}

export function importDataFile(file, callback = null, confirmFn = window.confirm) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!imported.data || typeof imported.data !== 'object') throw new Error('Invalid backup file format');
      const { players, lineup, formation } = imported.data;
      const hasExisting = state.players.length > 0 || state.lineup.length > 0;
      if (hasExisting) {
        const ok = confirmFn('This will replace all your current data. Continue?');
        if (!ok) return;
      }
      if (Array.isArray(players)) state.players = players;
      if (Array.isArray(lineup)) state.lineup = lineup;
      if (formation) {
        state.currentFormation = formation;
        document.getElementById('formation').value = formation;
      }
      saveData();
      showBackupMessage(`✓ Data imported successfully! ${state.players.length} player(s) loaded.`, 'success');
      if (callback) callback();
    } catch (err) {
      console.error(err);
      showBackupMessage('Error: Invalid backup file. Please check the file format.', 'error');
    }
  };
  reader.onerror = () => showBackupMessage('Error reading file. Please try again.', 'error');
  reader.readAsText(file);
}

export function showBackupMessage(message, type) {
  const div = document.getElementById('backup-message');
  if (!div) return;
  div.textContent = message;
  div.className = `backup-message ${type}`;
  setTimeout(() => { div.textContent=''; div.className='backup-message'; }, 5000);
}