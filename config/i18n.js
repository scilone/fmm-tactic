// Internationalization module
export const translations = {
  en: {
    // UI Labels
    appTitle: 'FMM Tactic Manager',
    appSubtitle: 'Manage your Football Manager Mobile squad',
    tabs: {
      squad: 'Squad',
      lineup: 'Starting 11',
      addPlayer: 'Add Player'
    },
    squadSection: {
      title: 'Your Squad',
      playersCount: '{count} player',
      playersCountPlural: '{count} players',
      exportData: 'Export Data',
      importData: 'Import Data',
      allPositions: 'All Positions',
      searchPlaceholder: 'Search players...',
      noPlayersFound: 'No players found',
      addPlayersToStart: 'Add players to your squad to get started!',
      rating: 'Rating',
      edit: 'Edit',
      delete: 'Delete',
      deleteConfirm: 'Delete player?'
    },
    lineupSection: {
      title: 'Starting 11',
      formation: 'Formation',
      clear: 'Clear',
      clearConfirm: 'Remove all players from the lineup?',
      teamAvgRating: 'Team Average Rating',
      remove: 'Remove',
      swap: 'Swap',
      noAvailablePosition: 'No available position for player',
      maxPlayersReached: 'Custom formation can only have 11 players maximum.',
      playerCannotPlay: 'Player cannot play in this position.',
      swapInvalid: 'Swap invalid: position incompatibility.',
      noAvailablePlayers: 'No available {position} players.'
    },
    playerForm: {
      title: 'Add New Player',
      editTitle: 'Edit Player',
      name: 'Name',
      position: 'Position',
      technicalAttributes: 'Technical Attributes',
      mentalAttributes: 'Mental Attributes',
      physicalAttributes: 'Physical Attributes',
      goalkeeperAttributes: 'Goalkeeper Attributes',
      addPlayer: 'Add Player',
      updatePlayer: 'Update Player',
      cancel: 'Cancel',
      pasteJson: 'Paste JSON here:',
      importFromJson: 'Import from JSON',
      selectPosition: 'Please select at least one position',
      jsonPlaceholder: 'Paste your player JSON data here...'
    },
    modals: {
      selectPositionFor: 'Select Position for {name}',
      selectRoleFor: 'Select Role for {name}',
      selectRoleForPosition: 'Select Role for {position}',
      selectPlayer: 'Select {position} Player',
      selectPlayerWithRole: 'Select {position} Player - {role}',
      playerDetails: 'Player Details',
      positionRatings: '{name} - Position Ratings',
      noPositionData: 'No position data available for this player.',
      searchPlaceholder: 'Search player by name...',
      noRolesAvailable: 'No roles available for this position',
      clickToChangeRole: 'Click to change role',
      clickToChangePlayer: 'Click to change player'
    },
    // Position codes
    positions: {
      GK: 'GK',
      DC: 'DC',
      DL: 'DL',
      DR: 'DR',
      WBL: 'WBL',
      WBR: 'WBR',
      DMC: 'DMC',
      MC: 'MC',
      ML: 'ML',
      MR: 'MR',
      AML: 'AML',
      AMR: 'AMR',
      AMC: 'AMC',
      ST: 'ST'
    },
    // Position full names for filter
    positionNames: {
      GK: 'Goalkeeper',
      DC: 'Defender Center',
      DL: 'Defender Left',
      DR: 'Defender Right',
      WBL: 'Wing Back Left',
      WBR: 'Wing Back Right',
      DMC: 'Defensive Midfielder Center',
      MC: 'Midfielder Center',
      ML: 'Midfielder Left',
      MR: 'Midfielder Right',
      AML: 'Attacking Midfielder Left',
      AMR: 'Attacking Midfielder Right',
      AMC: 'Attacking Midfielder Center',
      ST: 'Striker'
    },
    // Roles
    roles: {
      // GK
      'Goalkeeper': 'Goalkeeper',
      'Sweeper Keeper': 'Sweeper Keeper',
      // DC
      'Central Defender': 'Central Defender',
      'No-Nonsense Center-Back': 'No-Nonsense Center-Back',
      'Sweeper': 'Sweeper',
      'Ball Playing Defender': 'Ball Playing Defender',
      'Wide Center Back': 'Wide Center Back',
      'Libero': 'Libero',
      // DL/DR
      'Full-Back': 'Full-Back',
      'Inverted Full Back': 'Inverted Full Back',
      'Inverted Wing Back': 'Inverted Wing Back',
      'Defensive Full Back': 'Defensive Full Back',
      'Wing-Back': 'Wing-Back',
      // DMC
      'Defensive Midfielder': 'Defensive Midfielder',
      'Anchor': 'Anchor',
      'Roaming Playmaker': 'Roaming Playmaker',
      'Deep Lying Playmaker': 'Deep Lying Playmaker',
      'Ball Winning Midfielder': 'Ball Winning Midfielder',
      // MC
      'Central Midfielder': 'Central Midfielder',
      'Box To Box Midfielder': 'Box To Box Midfielder',
      'Advanced Playmaker': 'Advanced Playmaker',
      // ML/MR
      'Wide Midfielder': 'Wide Midfielder',
      'Defensive Winger': 'Defensive Winger',
      'Winger': 'Winger',
      'Inverted Winger': 'Inverted Winger',
      // AML/AMR
      'Inside Forward': 'Inside Forward',
      // AMC
      'Attacking Midfielder': 'Attacking Midfielder',
      'Trequartista': 'Trequartista',
      'Shadow Striker': 'Shadow Striker',
      // ST
      'Poacher': 'Poacher',
      'Deep Lying Forward': 'Deep Lying Forward',
      'Complete Forward': 'Complete Forward',
      'Target Forward': 'Target Forward',
      'Advanced Forward': 'Advanced Forward',
      'Pressing Forward': 'Pressing Forward'
    },
    // Attributes
    attributes: {
      aerial: 'Aerial',
      crossing: 'Crossing',
      dribbling: 'Dribbling',
      passing: 'Passing',
      shooting: 'Shooting',
      tackling: 'Tackling',
      technique: 'Technique',
      creativity: 'Creativity',
      decisions: 'Decisions',
      movement: 'Movement',
      aggression: 'Aggression',
      positioning: 'Positioning',
      teamwork: 'Teamwork',
      pace: 'Pace',
      stamina: 'Stamina',
      strength: 'Strength',
      leadership: 'Leadership',
      agility: 'Agility',
      handling: 'Handling',
      kicking: 'Kicking',
      reflexes: 'Reflexes',
      throwing: 'Throwing'
    }
  },
  fr: {
    // UI Labels
    appTitle: 'FMM Gestionnaire Tactique',
    appSubtitle: 'Gérez votre équipe Football Manager Mobile',
    tabs: {
      squad: 'Effectif',
      lineup: '11 Titulaire',
      addPlayer: 'Ajouter Joueur'
    },
    squadSection: {
      title: 'Votre Effectif',
      playersCount: '{count} joueur',
      playersCountPlural: '{count} joueurs',
      exportData: 'Exporter Données',
      importData: 'Importer Données',
      allPositions: 'Toutes Positions',
      searchPlaceholder: 'Rechercher joueurs...',
      noPlayersFound: 'Aucun joueur trouvé',
      addPlayersToStart: 'Ajoutez des joueurs à votre effectif pour commencer !',
      rating: 'Note',
      edit: 'Modifier',
      delete: 'Supprimer',
      deleteConfirm: 'Supprimer ce joueur ?'
    },
    lineupSection: {
      title: '11 Titulaire',
      formation: 'Formation',
      clear: 'Effacer',
      clearConfirm: 'Retirer tous les joueurs de la composition ?',
      teamAvgRating: 'Note Moyenne Équipe',
      remove: 'Retirer',
      swap: 'Échanger',
      noAvailablePosition: 'Aucune position disponible pour ce joueur',
      maxPlayersReached: 'La formation personnalisée ne peut avoir que 11 joueurs maximum.',
      playerCannotPlay: 'Le joueur ne peut pas jouer à ce poste.',
      swapInvalid: 'Échange invalide : incompatibilité de position.',
      noAvailablePlayers: 'Aucun joueur {position} disponible.'
    },
    playerForm: {
      title: 'Ajouter Nouveau Joueur',
      editTitle: 'Modifier Joueur',
      name: 'Nom',
      position: 'Position',
      technicalAttributes: 'Attributs Techniques',
      mentalAttributes: 'Attributs Mentaux',
      physicalAttributes: 'Attributs Physiques',
      goalkeeperAttributes: 'Attributs Gardien',
      addPlayer: 'Ajouter Joueur',
      updatePlayer: 'Mettre à jour',
      cancel: 'Annuler',
      pasteJson: 'Collez le JSON ici :',
      importFromJson: 'Importer depuis JSON',
      selectPosition: 'Veuillez sélectionner au moins une position',
      jsonPlaceholder: 'Collez les données JSON du joueur ici...'
    },
    modals: {
      selectPositionFor: 'Sélectionner Position pour {name}',
      selectRoleFor: 'Sélectionner Rôle pour {name}',
      selectRoleForPosition: 'Sélectionner Rôle pour {position}',
      selectPlayer: 'Sélectionner Joueur {position}',
      selectPlayerWithRole: 'Sélectionner Joueur {position} - {role}',
      playerDetails: 'Détails Joueur',
      positionRatings: '{name} - Notes par Position',
      noPositionData: 'Aucune donnée de position disponible pour ce joueur.',
      searchPlaceholder: 'Rechercher par nom...',
      noRolesAvailable: 'Aucun rôle disponible pour cette position',
      clickToChangeRole: 'Cliquez pour changer le rôle',
      clickToChangePlayer: 'Cliquez pour changer le joueur'
    },
    // Position codes
    positions: {
      GK: 'GB',
      DC: 'DC',
      DL: 'DG',
      DR: 'DD',
      WBL: 'ALG',
      WBR: 'ALD',
      DMC: 'MDC',
      MC: 'MC',
      ML: 'MG',
      MR: 'MD',
      AML: 'MOG',
      AMR: 'MOD',
      AMC: 'MOC',
      ST: 'AC'
    },
    // Position full names for filter
    positionNames: {
      GK: 'Gardien de but',
      DC: 'Défenseur central',
      DL: 'Défenseur gauche',
      DR: 'Défenseur droit',
      WBL: 'Arrière latéral gauche',
      WBR: 'Arrière latéral droit',
      DMC: 'Milieu défensif central',
      MC: 'Milieu central',
      ML: 'Milieu gauche',
      MR: 'Milieu droit',
      AML: 'Milieu offensif gauche',
      AMR: 'Milieu offensif droit',
      AMC: 'Milieu offensif central',
      ST: 'Attaquant'
    },
    // Roles
    roles: {
      // GK
      'Goalkeeper': 'Gardien de but',
      'Sweeper Keeper': 'Gardien-libéro',
      // DC
      'Central Defender': 'Défenseur central',
      'No-Nonsense Center-Back': 'Défenseur central strict',
      'Sweeper': 'Libéro défensif',
      'Ball Playing Defender': 'Défenseur-relanceur',
      'Wide Center Back': 'Défenseur central décalé',
      'Libero': 'Libéro',
      // DL/DR
      'Full-Back': 'Arrière latéral',
      'Inverted Full Back': 'Arrière latéral inversé',
      'Inverted Wing Back': 'Latéral intérieur',
      'Defensive Full Back': 'Défenseur latéral',
      'Wing-Back': 'Latéral offensif',
      // DMC
      'Defensive Midfielder': 'Milieu défensif',
      'Anchor': 'Milieu sentinelle',
      'Roaming Playmaker': 'Meneur de jeu polyvalent',
      'Deep Lying Playmaker': 'Meneur de jeu en retrait',
      'Ball Winning Midfielder': 'Milieu récupérateur',
      // MC
      'Central Midfielder': 'Milieu axial',
      'Box To Box Midfielder': 'Milieu box to box',
      'Advanced Playmaker': 'Meneur de jeu avancé',
      // ML/MR
      'Wide Midfielder': 'Milieu latéral',
      'Defensive Winger': 'Ailier défensif',
      'Winger': 'Ailier',
      'Inverted Winger': 'Ailier inversé',
      // AML/AMR
      'Inside Forward': 'Attaquant intérieur',
      // AMC
      'Attacking Midfielder': 'Milieu offensif',
      'Trequartista': 'Attaquant de soutien',
      'Shadow Striker': 'Neuf et demi',
      // ST
      'Poacher': 'Renard des surfaces',
      'Deep Lying Forward': 'Attaquant en retrait',
      'Complete Forward': 'Attaquant complet',
      'Target Forward': 'Attaquant pivot',
      'Advanced Forward': 'Attaquant avancé',
      'Pressing Forward': 'Attaquant pressing'
    },
    // Attributes
    attributes: {
      aerial: 'Balles hautes',
      crossing: 'Centres',
      dribbling: 'Dribble',
      passing: 'Passes',
      shooting: 'Tir',
      tackling: 'Tacles',
      technique: 'Technique',
      creativity: 'Créativité',
      decisions: 'Décisions',
      movement: 'Déplacements',
      aggression: 'Aggressivité',
      positioning: 'Placement',
      teamwork: 'Collectif',
      pace: 'Vitesse',
      stamina: 'Endurance',
      strength: 'Puissance',
      leadership: 'Leadership',
      agility: 'Agilité',
      handling: 'Prise de balle',
      kicking: 'Dégagement',
      reflexes: 'Réflexes',
      throwing: 'Relances'
    }
  }
};

// Current language state
let currentLanguage = 'en';

// Get current language
export function getCurrentLanguage() {
  return currentLanguage;
}

// Set language
export function setLanguage(lang) {
  if (translations[lang]) {
    currentLanguage = lang;
    localStorage.setItem('fmm-language', lang);
    return true;
  }
  return false;
}

// Load saved language
export function loadLanguage() {
  const saved = localStorage.getItem('fmm-language');
  if (saved && translations[saved]) {
    currentLanguage = saved;
  }
  return currentLanguage;
}

// Get translation
export function t(key, replacements = {}) {
  const keys = key.split('.');
  let value = translations[currentLanguage];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English
      value = translations.en;
      for (const k2 of keys) {
        if (value && typeof value === 'object' && k2 in value) {
          value = value[k2];
        } else {
          return key; // Return key if not found
        }
      }
      break;
    }
  }
  
  // Apply replacements
  if (typeof value === 'string') {
    for (const [placeholder, replacement] of Object.entries(replacements)) {
      value = value.replace(`{${placeholder}}`, replacement);
    }
  }
  
  return value;
}

// Translate a role name
export function translateRole(roleKey) {
  const roles = translations[currentLanguage].roles;
  return roles[roleKey] || roleKey;
}

// Translate a position code
export function translatePosition(positionCode) {
  const positions = translations[currentLanguage].positions;
  return positions[positionCode] || positionCode;
}

// Translate a position full name
export function translatePositionName(positionCode) {
  const positionNames = translations[currentLanguage].positionNames;
  return positionNames[positionCode] || positionCode;
}

// Translate an attribute
export function translateAttribute(attrKey) {
  const attrs = translations[currentLanguage].attributes;
  return attrs[attrKey] || attrKey;
}

// Get available languages
export function getAvailableLanguages() {
  return Object.keys(translations);
}
