// FMM Tactic Manager - Main Application

// Data structures
let players = [];
let lineup = [];
let currentFormation = '4-4-2';
let editingPlayerId = null;

// Formation definitions - updated to use specific positions
const formations = {
    '4-4-2': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'DL', position: 'DL', row: 1 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'DR', position: 'DR', row: 1 },
        { label: 'ML', position: 'ML', row: 2 },
        { label: 'MC', position: 'MC', row: 2 },
        { label: 'MC', position: 'MC', row: 2 },
        { label: 'MR', position: 'MR', row: 2 },
        { label: 'ST', position: 'ST', row: 3 },
        { label: 'ST', position: 'ST', row: 3 }
    ],
    '4-3-3': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'DL', position: 'DL', row: 1 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'DR', position: 'DR', row: 1 },
        { label: 'MC', position: 'MC', row: 2 },
        { label: 'MC', position: 'MC', row: 2 },
        { label: 'MC', position: 'MC', row: 2 },
        { label: 'AML', position: 'AML', row: 3 },
        { label: 'ST', position: 'ST', row: 3 },
        { label: 'AMR', position: 'AMR', row: 3 }
    ],
    '3-5-2': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'ML', position: 'ML', row: 2 },
        { label: 'MC', position: 'MC', row: 2 },
        { label: 'MC', position: 'MC', row: 2 },
        { label: 'MC', position: 'MC', row: 2 },
        { label: 'MR', position: 'MR', row: 2 },
        { label: 'ST', position: 'ST', row: 3 },
        { label: 'ST', position: 'ST', row: 3 }
    ],
    '4-2-3-1': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'DL', position: 'DL', row: 1 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'DR', position: 'DR', row: 1 },
        { label: 'DMC', position: 'DMC', row: 2 },
        { label: 'DMC', position: 'DMC', row: 2 },
        { label: 'AML', position: 'AML', row: 3 },
        { label: 'AMC', position: 'AMC', row: 3 },
        { label: 'AMR', position: 'AMR', row: 3 },
        { label: 'ST', position: 'ST', row: 4 }
    ],
    '4-5-1': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'DL', position: 'DL', row: 1 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'DR', position: 'DR', row: 1 },
        { label: 'ML', position: 'ML', row: 2 },
        { label: 'MC', position: 'MC', row: 2 },
        { label: 'MC', position: 'MC', row: 2 },
        { label: 'MC', position: 'MC', row: 2 },
        { label: 'MR', position: 'MR', row: 2 },
        { label: 'ST', position: 'ST', row: 3 }
    ],
    '3-4-3': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'ML', position: 'ML', row: 2 },
        { label: 'MC', position: 'MC', row: 2 },
        { label: 'MC', position: 'MC', row: 2 },
        { label: 'MR', position: 'MR', row: 2 },
        { label: 'AML', position: 'AML', row: 3 },
        { label: 'ST', position: 'ST', row: 3 },
        { label: 'AMR', position: 'AMR', row: 3 }
    ],
    '5-3-2': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'WBL', position: 'WBL', row: 1 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'DC', position: 'DC', row: 1 },
        { label: 'WBR', position: 'WBR', row: 1 },
        { label: 'MC', position: 'MC', row: 2 },
        { label: 'MC', position: 'MC', row: 2 },
        { label: 'MC', position: 'MC', row: 2 },
        { label: 'ST', position: 'ST', row: 3 },
        { label: 'ST', position: 'ST', row: 3 }
    ]
};

// Role definitions for each position
const positionRoles = {
    'GK': [
        'Goalkeeper',
        'Sweeper Keeper'
    ],
    'DC': [
        'Central Defender',
        'No-Nonsense Center-Back',
        'Sweeper',
        'Ball Playing Defender',
        'Wide Center Back',
        'Libero'
    ],
    'DL': [
        'Full-Back',
        'Inverted Full Back',
        'Inverted Wing Back',
        'Defensive Full Back',
        'Wing-Back'
    ],
    'DR': [
        'Full-Back',
        'Inverted Full Back',
        'Inverted Wing Back',
        'Defensive Full Back',
        'Wing-Back'
    ],
    'WBL': [
        'Wing-Back',
        'Inverted Wing Back'
    ],
    'WBR': [
        'Wing-Back',
        'Inverted Wing Back'
    ],
    'DMC': [
        'Defensive Midfielder',
        'Anchor',
        'Roaming Playmaker',
        'Deep Lying Playmaker',
        'Ball Winning Midfielder'
    ],
    'MC': [
        'Central Midfielder',
        'Anchor',
        'Box To Box Midfielder',
        'Roaming Playmaker',
        'Deep Lying Playmaker',
        'Ball Winning Midfielder',
        'Advanced Playmaker'
    ],
    'ML': [
        'Wide Midfielder',
        'Defensive Winger',
        'Winger',
        'Inverted Winger'
    ],
    'MR': [
        'Wide Midfielder',
        'Defensive Winger',
        'Winger',
        'Inverted Winger'
    ],
    'AML': [
        'Winger',
        'Advanced Playmaker',
        'Inside Forward',
        'Inverted Winger'
    ],
    'AMR': [
        'Winger',
        'Advanced Playmaker',
        'Inside Forward',
        'Inverted Winger'
    ],
    'AMC': [
        'Attacking Midfielder',
        'Trequartista',
        'Advanced Playmaker',
        'Shadow Striker'
    ],
    'ST': [
        'Poacher',
        'Deep Lying Forward',
        'Complete Forward',
        'Trequartista',
        'Target Forward',
        'Advanced Forward',
        'Pressing Forward'
    ]
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupEventListeners();
    renderSquad();
    renderLineup();
});

// Setup event listeners
function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Player form
    const form = document.getElementById('player-form');
    form.addEventListener('submit', handleAddPlayer);
    
    const cancelBtn = document.getElementById('cancel-btn');
    cancelBtn.addEventListener('click', () => {
        form.reset();
        editingPlayerId = null;
        updateFormTitle();
        switchTab('squad');
    });

    // Position selector for GK attributes
    const positionInputs = document.querySelectorAll('input[name="position"]');
    positionInputs.forEach(input => {
        input.addEventListener('change', toggleGKAttributes);
    });

    // Formation selector
    const formationSelect = document.getElementById('formation');
    formationSelect.addEventListener('change', (e) => {
        currentFormation = e.target.value;
        saveData();
        renderLineup();
    });

    // Search and filter
    const searchInput = document.getElementById('search-player');
    searchInput.addEventListener('input', renderSquad);

    const positionFilter = document.getElementById('position-filter');
    positionFilter.addEventListener('change', renderSquad);

    // JSON import
    const importBtn = document.getElementById('import-json-btn');
    importBtn.addEventListener('click', handleImportJSON);

    // Data export/import
    const exportBtn = document.getElementById('export-data-btn');
    exportBtn.addEventListener('click', handleExportData);

    const importDataBtn = document.getElementById('import-data-btn');
    importDataBtn.addEventListener('click', () => {
        document.getElementById('import-file-input').click();
    });

    const importFileInput = document.getElementById('import-file-input');
    importFileInput.addEventListener('change', handleImportData);
}

// Tab switching
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === tabName);
    });
}

// Toggle GK attributes visibility
function getPlayerPositions(player) {
    if (!player) return [];
    if (Array.isArray(player.positions)) return player.positions;
    if (player.position) return [player.position];
    return [];
}

function toggleGKAttributes() {
    const selectedPositions = Array.from(document.querySelectorAll('input[name="position"]:checked')).map(i => i.value);
    const gkSection = document.getElementById('gk-attributes');
    gkSection.style.display = selectedPositions.includes('GK') ? 'block' : 'none';
}

// Handle JSON import
function handleImportJSON() {
    const textarea = document.getElementById('import-json-textarea');
    const jsonText = textarea.value.trim();
    
    if (!jsonText) {
        showImportMessage('Please paste JSON data in the textarea', 'error');
        return;
    }

    try {
        const data = JSON.parse(jsonText);
        
        // Pre-fill name if present
        const nameValue = data.name || data.Name;
        if (nameValue !== undefined) {
            document.getElementById('player-name').value = nameValue;
        }
        
        // Pre-fill position(s) if present and valid
        const positionValue = data.position || data.Position;
        const positionsValue = data.positions || data.Positions;
        const posMap = {
            DEF: ['DL','DC','DR','WBL','WBR'],
            MID: ['ML','MC','MR','DMC','AMC','AML','AMR'],
            FWD: ['ST','AML','AMR']
        };

        let positionsToCheck = [];
        if (Array.isArray(positionsValue) && positionsValue.length > 0) {
            positionsToCheck = positionsValue;
        } else if (positionValue !== undefined) {
            // positionValue may be a broad category; map it to specific positions
            if (posMap[positionValue]) positionsToCheck = posMap[positionValue];
            else positionsToCheck = [positionValue];
        }

        if (positionsToCheck.length > 0) {
            document.querySelectorAll('input[name="position"]').forEach(inp => {
                inp.checked = positionsToCheck.includes(inp.value);
            });
            toggleGKAttributes();
        }

        // Pre-fill attributes if they exist (either in data.attributes or directly in data)
        const attrs = data.attributes || data;
        
        // Helper function to get attribute value with case-insensitive matching
        const getAttr = (keys) => {
            for (const key of keys) {
                if (attrs[key] !== undefined) return attrs[key];
            }
            return undefined;
        };
        
        // Technical attributes
        const aerial = getAttr(['aerial', 'Aerial']);
        if (aerial !== undefined) document.getElementById('attr-aerial').value = aerial;
        
        const crossing = getAttr(['crossing', 'Crossing']);
        if (crossing !== undefined) document.getElementById('attr-crossing').value = crossing;
        
        const dribbling = getAttr(['dribbling', 'Dribbling']);
        if (dribbling !== undefined) document.getElementById('attr-dribbling').value = dribbling;
        
        const passing = getAttr(['passing', 'Passing']);
        if (passing !== undefined) document.getElementById('attr-passing').value = passing;
        
        const shooting = getAttr(['shooting', 'Shooting']);
        if (shooting !== undefined) document.getElementById('attr-shooting').value = shooting;
        
        const tackling = getAttr(['tackling', 'Tackling']);
        if (tackling !== undefined) document.getElementById('attr-tackling').value = tackling;
        
        const technique = getAttr(['technique', 'Technique']);
        if (technique !== undefined) document.getElementById('attr-technique').value = technique;
        
        // Mental attributes
        const creativity = getAttr(['creativity', 'Creativity']);
        if (creativity !== undefined) document.getElementById('attr-creativity').value = creativity;
        
        const decisions = getAttr(['decisions', 'Decisions']);
        if (decisions !== undefined) document.getElementById('attr-decisions').value = decisions;
        
        const movement = getAttr(['movement', 'Movement']);
        if (movement !== undefined) document.getElementById('attr-movement').value = movement;
        
        const aggression = getAttr(['aggression', 'Aggression']);
        if (aggression !== undefined) document.getElementById('attr-aggression').value = aggression;
        
        const positioning = getAttr(['positioning', 'Positioning']);
        if (positioning !== undefined) document.getElementById('attr-positioning').value = positioning;
        
        const teamwork = getAttr(['teamwork', 'Teamwork']);
        if (teamwork !== undefined) document.getElementById('attr-teamwork').value = teamwork;
        
        const leadership = getAttr(['leadership', 'Leadership']);
        if (leadership !== undefined) document.getElementById('attr-leadership').value = leadership;
        
        // Physical attributes
        const pace = getAttr(['pace', 'Pace']);
        if (pace !== undefined) document.getElementById('attr-pace').value = pace;
        
        const stamina = getAttr(['stamina', 'Stamina']);
        if (stamina !== undefined) document.getElementById('attr-stamina').value = stamina;
        
        const strength = getAttr(['strength', 'Strength']);
        if (strength !== undefined) document.getElementById('attr-strength').value = strength;
        
        // GK-specific attributes (only if position is GK)
        const checkPositions = Array.from(document.querySelectorAll('input[name="position"]:checked')).map(i => i.value);
        if (checkPositions.includes('GK')) {
            const agility = getAttr(['agility', 'Agility', 'Agility (GK)']);
            if (agility !== undefined) document.getElementById('attr-agility').value = agility;
            
            const handling = getAttr(['handling', 'Handling', 'Handling (GK)']);
            if (handling !== undefined) document.getElementById('attr-handling').value = handling;
            
            const kicking = getAttr(['kicking', 'Kicking', 'Kicking (GK)']);
            if (kicking !== undefined) document.getElementById('attr-kicking').value = kicking;
            
            const reflexes = getAttr(['reflexes', 'Reflexes', 'Reflexes (GK)']);
            if (reflexes !== undefined) document.getElementById('attr-reflexes').value = reflexes;
            
            const throwing = getAttr(['throwing', 'Throwing', 'Throwing (GK)']);
            if (throwing !== undefined) document.getElementById('attr-throwing').value = throwing;
        }

        showImportMessage('✓ Player data imported successfully! Review and click "Add Player" to save.', 'success');
        
        // Clear the textarea
        textarea.value = '';
        
    } catch (error) {
        showImportMessage('Error: Invalid JSON format. Please check your data.', 'error');
    }
}

// Show import message
function showImportMessage(message, type) {
    const messageDiv = document.getElementById('import-message');
    messageDiv.textContent = message;
    messageDiv.className = `import-message ${type}`;
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'import-message';
    }, 5000);
}

// Add player
// Add or Edit player
function handleAddPlayer(e) {
    e.preventDefault();

    const selectedInputs = document.querySelectorAll('input[name="position"]:checked');
    if (!selectedInputs || selectedInputs.length === 0) {
        alert('Please select at least one position');
        return;
    }
    const selectedPositions = Array.from(selectedInputs).map(i => i.value);

    const player = {
        id: editingPlayerId || Date.now(),
        name: document.getElementById('player-name').value,
        positions: selectedPositions,
        position: selectedPositions[0],
        attributes: {
            aerial: parseInt(document.getElementById('attr-aerial').value),
            crossing: parseInt(document.getElementById('attr-crossing').value),
            dribbling: parseInt(document.getElementById('attr-dribbling').value),
            passing: parseInt(document.getElementById('attr-passing').value),
            shooting: parseInt(document.getElementById('attr-shooting').value),
            tackling: parseInt(document.getElementById('attr-tackling').value),
            technique: parseInt(document.getElementById('attr-technique').value),
            creativity: parseInt(document.getElementById('attr-creativity').value),
            decisions: parseInt(document.getElementById('attr-decisions').value),
            movement: parseInt(document.getElementById('attr-movement').value),
            aggression: parseInt(document.getElementById('attr-aggression').value),
            positioning: parseInt(document.getElementById('attr-positioning').value),
            teamwork: parseInt(document.getElementById('attr-teamwork').value),
            pace: parseInt(document.getElementById('attr-pace').value),
            stamina: parseInt(document.getElementById('attr-stamina').value),
            strength: parseInt(document.getElementById('attr-strength').value),
            leadership: parseInt(document.getElementById('attr-leadership').value)
        }
    };

    // Add GK-specific attributes if goalkeeper
    if (getPlayerPositions(player).includes('GK')) {
        player.attributes.agility = parseInt(document.getElementById('attr-agility').value);
        player.attributes.handling = parseInt(document.getElementById('attr-handling').value);
        player.attributes.kicking = parseInt(document.getElementById('attr-kicking').value);
        player.attributes.reflexes = parseInt(document.getElementById('attr-reflexes').value);
        player.attributes.throwing = parseInt(document.getElementById('attr-throwing').value);
    }

    if (editingPlayerId) {
        // Update existing player
        const index = players.findIndex(p => p.id === editingPlayerId);
        if (index !== -1) {
            players[index] = player;
        }
        editingPlayerId = null;
    } else {
        // Add new player
        players.push(player);
    }
    
    saveData();
    
    e.target.reset();
    updateFormTitle();
    switchTab('squad');
    renderSquad();
    renderLineup();
}

// Calculate player rating
function calculateRating(player) {
    const attrs = player.attributes;
    let sum = 0;
    let count = 0;

    // Count all standard attributes
    const standardAttrs = ['aerial', 'crossing', 'dribbling', 'passing', 'shooting', 
                           'tackling', 'technique', 'creativity', 'decisions', 'movement',
                           'aggression', 'positioning', 'teamwork', 'pace', 'stamina', 
                           'strength', 'leadership'];
    
    standardAttrs.forEach(attr => {
        sum += attrs[attr];
        count++;
    });

    // Add GK attributes if goalkeeper
    if (getPlayerPositions(player).includes('GK')) {
        const gkAttrs = ['agility', 'handling', 'kicking', 'reflexes', 'throwing'];
        gkAttrs.forEach(attr => {
            if (attrs[attr]) {
                sum += attrs[attr];
                count++;
            }
        });
    }

    return (sum / count).toFixed(1);
}

// Render squad list
function renderSquad() {
    const squadList = document.getElementById('squad-list');
    const searchTerm = document.getElementById('search-player').value.toLowerCase();
    const positionFilter = document.getElementById('position-filter').value;

    let filteredPlayers = players.filter(player => {
        const matchesSearch = player.name.toLowerCase().includes(searchTerm);
        const playerPositions = getPlayerPositions(player);
        const matchesPosition = positionFilter === 'all' || playerPositions.includes(positionFilter);
        return matchesSearch && matchesPosition;
    });

    document.getElementById('squad-count').textContent = 
        `${filteredPlayers.length} player${filteredPlayers.length !== 1 ? 's' : ''}`;

    if (filteredPlayers.length === 0) {
        squadList.innerHTML = `
            <div class="empty-state">
                <h3>No players found</h3>
                <p>Add players to your squad to get started!</p>
            </div>
        `;
        return;
    }

    squadList.innerHTML = filteredPlayers.map(player => `
        <div class="player-card">
            <div class="player-card-header">
                <span class="player-name">${player.name}</span>
                <span class="player-position">${(getPlayerPositions(player) || []).join(', ')}</span>
            </div>
            <div class="player-rating">Rating: ${calculateRating(player)}</div>
            <div class="player-actions">
                <button class="btn btn-primary btn-small" onclick="addToLineup(${player.id})">
                    Add to Lineup
                </button>
                <button class="btn btn-secondary btn-small" onclick="editPlayer(${player.id})">
                    Edit
                </button>
                <button class="btn btn-danger btn-small" onclick="deletePlayer(${player.id})">
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Edit player
window.editPlayer = function editPlayer(id) {
    const player = players.find(p => p.id === id);
    if (!player) return;

    editingPlayerId = id;

    // Populate form with player data
    document.getElementById('player-name').value = player.name;
    
    // Set the radio button for position
    // check all position inputs that belong to that player
    const positions = getPlayerPositions(player);
    document.querySelectorAll('input[name="position"]').forEach(inp => {
        inp.checked = positions.includes(inp.value);
    });
    
    // Set all attributes
    document.getElementById('attr-aerial').value = player.attributes.aerial;
    document.getElementById('attr-crossing').value = player.attributes.crossing;
    document.getElementById('attr-dribbling').value = player.attributes.dribbling;
    document.getElementById('attr-passing').value = player.attributes.passing;
    document.getElementById('attr-shooting').value = player.attributes.shooting;
    document.getElementById('attr-tackling').value = player.attributes.tackling;
    document.getElementById('attr-technique').value = player.attributes.technique;
    document.getElementById('attr-creativity').value = player.attributes.creativity;
    document.getElementById('attr-decisions').value = player.attributes.decisions;
    document.getElementById('attr-movement').value = player.attributes.movement;
    document.getElementById('attr-aggression').value = player.attributes.aggression;
    document.getElementById('attr-positioning').value = player.attributes.positioning;
    document.getElementById('attr-teamwork').value = player.attributes.teamwork;
    document.getElementById('attr-pace').value = player.attributes.pace;
    document.getElementById('attr-stamina').value = player.attributes.stamina;
    document.getElementById('attr-strength').value = player.attributes.strength;
    document.getElementById('attr-leadership').value = player.attributes.leadership;

    // Set GK attributes if goalkeeper
    if (getPlayerPositions(player).includes('GK')) {
        document.getElementById('attr-agility').value = player.attributes.agility || 10;
        document.getElementById('attr-handling').value = player.attributes.handling || 10;
        document.getElementById('attr-kicking').value = player.attributes.kicking || 10;
        document.getElementById('attr-reflexes').value = player.attributes.reflexes || 10;
        document.getElementById('attr-throwing').value = player.attributes.throwing || 10;
    }

    toggleGKAttributes();
    updateFormTitle();
    switchTab('add-player');
}

// Delete player
window.deletePlayer = function deletePlayer(id) {
    if (confirm('Are you sure you want to delete this player?')) {
        players = players.filter(p => p.id !== id);
        lineup = lineup.filter(slot => slot.playerId !== id);
        saveData();
        renderSquad();
        renderLineup();
    }
}

// Update form title based on mode
function updateFormTitle() {
    const formTitle = document.querySelector('#add-player .section-header h2');
    const submitBtn = document.querySelector('#player-form button[type="submit"]');
    
    if (editingPlayerId) {
        formTitle.textContent = 'Edit Player';
        submitBtn.textContent = 'Update Player';
    } else {
        formTitle.textContent = 'Add New Player';
        submitBtn.textContent = 'Add Player';
    }
}

// Add to lineup (show modal)
window.addToLineup = function addToLineup(playerId) {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    // Find empty slots that match player's position
    const formationDef = formations[currentFormation];
    const availableSlots = formationDef
        .map((slot, index) => ({ ...slot, index }))
            .filter(slot => {
            const slotFilled = lineup.find(l => l.slotIndex === slot.index);
            const playerPositions = getPlayerPositions(player);
            return !slotFilled && playerPositions.includes(slot.position);
        });

    if (availableSlots.length === 0) {
        alert(`No available ${(getPlayerPositions(player) || [])[0] || 'position'} positions in current formation`);
        return;
    }

    // If only one slot, assign directly
        if (availableSlots.length === 1) {
        lineup.push({
            slotIndex: availableSlots[0].index,
            playerId: player.id
        });
        saveData();
        renderLineup();
        return;
    }

    // Multiple slots available - show modal
    showPositionModal(player, availableSlots);
}

// Show position selection modal
function showPositionModal(player, slots) {
    const modal = createModal();
    const content = modal.querySelector('.modal-content');
    
    content.innerHTML = `
        <div class="modal-header">
            <h3>Select Position for ${player.name}</h3>
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-player-list">
            ${slots.map(slot => `
                <div class="modal-player-item" onclick="assignToSlot(${player.id}, ${slot.index})">
                    <div class="modal-player-name">${slot.label}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.classList.add('active');
}

// Create modal element
function createModal() {
    const existing = document.querySelector('.modal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    modal.appendChild(content);
    
    return modal;
}

// Close modal
window.closeModal = function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
}

// Show role selection modal
function showRoleSelectionModal(playerId, slotIndex, position, roles) {
    const player = players.find(p => p.id === playerId);
    if (!player) return;
    
    const modal = createModal();
    const content = modal.querySelector('.modal-content');
    
    content.innerHTML = `
        <div class="modal-header">
            <h3>Select Role for ${player.name}</h3>
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-player-list">
            ${roles.map(role => `
                <div class="modal-player-item" onclick="assignWithRole(${playerId}, ${slotIndex}, '${role}')">
                    <div class="modal-player-name">${role}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.classList.add('active');
}

// Assign player with role
window.assignWithRole = function assignWithRole(playerId, slotIndex, role) {
    lineup.push({ slotIndex, playerId, role });
    saveData();
    renderLineup();
    closeModal();
}

// Change role for an already assigned player
window.changeRole = function changeRole(slotIndex, position) {
    const assignment = lineup.find(l => l.slotIndex === slotIndex);
    if (!assignment) return;
    
    const roles = positionRoles[position] || [];
    if (roles.length === 0) return;
    
    const player = players.find(p => p.id === assignment.playerId);
    if (!player) return;
    
    const modal = createModal();
    const content = modal.querySelector('.modal-content');
    
    content.innerHTML = `
        <div class="modal-header">
            <h3>Change Role for ${player.name}</h3>
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-player-list">
            ${roles.map(role => {
                const isSelected = assignment.role === role;
                const selectedClass = isSelected ? ' selected' : '';
                return `
                    <div class="modal-player-item${selectedClass}" onclick="updateRole(${slotIndex}, '${role}')">
                        <div class="modal-player-name">${role}</div>
                        ${isSelected ? '<span class="checkmark">✓</span>' : ''}
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.classList.add('active');
}

// Update role for an assignment
window.updateRole = function updateRole(slotIndex, role) {
    const assignment = lineup.find(l => l.slotIndex === slotIndex);
    if (assignment) {
        assignment.role = role;
        saveData();
        renderLineup();
        closeModal();
    }
}

// Assign player to slot
window.assignToSlot = function assignToSlot(playerId, slotIndex, skipRoleSelection = false) {
    if (skipRoleSelection) {
        lineup.push({ slotIndex, playerId });
        saveData();
        renderLineup();
        closeModal();
        return;
    }
    
    // Show role selection modal
    const formationDef = formations[currentFormation];
    const slot = formationDef[slotIndex];
    const roles = positionRoles[slot.position] || [];
    
    if (roles.length === 0) {
        // No roles defined for this position, assign without role
        lineup.push({ slotIndex, playerId });
        saveData();
        renderLineup();
        closeModal();
        return;
    }
    
    showRoleSelectionModal(playerId, slotIndex, slot.position, roles);
}

// Remove from lineup
window.removeFromLineup = function removeFromLineup(slotIndex) {
    lineup = lineup.filter(slot => slot.slotIndex !== slotIndex);
    saveData();
    renderLineup();
}

// Render lineup
function renderLineup() {
    const pitch = document.getElementById('pitch');
    const formationDef = formations[currentFormation];
    
    // Group by rows
    const rows = {};
    formationDef.forEach((slot, index) => {
        if (!rows[slot.row]) rows[slot.row] = [];
        rows[slot.row].push({ ...slot, index });
    });

    const rowsHTML = Object.keys(rows).sort((a,b)=>b-a).map(rowNum => {
        const rowSlots = rows[rowNum];
        const slotsHTML = rowSlots.map(slot => {
            const assignment = lineup.find(l => l.slotIndex === slot.index);
            const player = assignment ? players.find(p => p.id === assignment.playerId) : null;

            if (player) {
                const role = assignment.role || '';
                const roleDisplay = role ? `<div class="position-role">${role}</div>` : '';
                return `
                    <div class="position-slot filled" onclick="changeRole(${slot.index}, '${slot.position}')">
                        <div class="position-label">${slot.label}</div>
                        <div class="position-player">${player.name}</div>
                        ${roleDisplay}
                        <div class="position-rating">${calculateRating(player)}</div>
                        <button class="position-remove" onclick="removeFromLineup(${slot.index}); event.stopPropagation();">Remove</button>
                    </div>
                `;
            } else {
                return `
                    <div class="position-slot" onclick="selectPlayerForSlot(${slot.index}, '${slot.position}')">
                        <div class="position-label">${slot.label}</div>
                        <div style="color: white; margin-top: 10px;">+</div>
                    </div>
                `;
            }
        }).join('');

        return `<div class="pitch-row">${slotsHTML}</div>`;
    }).join('');

    pitch.innerHTML = `<div class="pitch-positions">${rowsHTML}</div>`;

    // Update team average
    updateTeamAverage();
}

// Select player for slot (show modal with available players)
window.selectPlayerForSlot = function selectPlayerForSlot(slotIndex, position) {
    const availablePlayers = players.filter(p => {
        // Check if player matches position
        const playerPositions = getPlayerPositions(p);
        if (!playerPositions.includes(position)) return false;
        // Check if player is not already in lineup
        return !lineup.find(l => l.playerId === p.id);
    });

    if (availablePlayers.length === 0) {
        alert(`No available ${position} players. Add more players to your squad.`);
        return;
    }

    const modal = createModal();
    const content = modal.querySelector('.modal-content');
    
    content.innerHTML = `
        <div class="modal-header">
            <h3>Select ${position} Player</h3>
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-player-list">
            ${availablePlayers.map(player => `
                <div class="modal-player-item" onclick="assignToSlot(${player.id}, ${slotIndex})">
                    <div class="modal-player-name">${player.name}</div>
                    <div class="modal-player-info">
                        <span>${(getPlayerPositions(player) || []).join(', ')}</span>
                        <span>Rating: ${calculateRating(player)}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.classList.add('active');
}

// Update team average rating
function updateTeamAverage() {
    if (lineup.length === 0) {
        document.getElementById('team-avg').textContent = '0.0';
        return;
    }

    const lineupPlayers = lineup.map(slot => 
        players.find(p => p.id === slot.playerId)
    ).filter(p => p);

    if (lineupPlayers.length === 0) {
        document.getElementById('team-avg').textContent = '0.0';
        return;
    }

    const totalRating = lineupPlayers.reduce((sum, player) => 
        sum + parseFloat(calculateRating(player)), 0
    );
    
    const average = (totalRating / lineupPlayers.length).toFixed(1);
    document.getElementById('team-avg').textContent = average;
}

// Local storage functions
function saveData() {
    localStorage.setItem('fmm-players', JSON.stringify(players));
    localStorage.setItem('fmm-lineup', JSON.stringify(lineup));
    localStorage.setItem('fmm-formation', currentFormation);
}

function loadData() {
    const savedPlayers = localStorage.getItem('fmm-players');
    const savedLineup = localStorage.getItem('fmm-lineup');
    const savedFormation = localStorage.getItem('fmm-formation');

    if (savedPlayers) {
        players = JSON.parse(savedPlayers);
    }
    if (savedLineup) {
        lineup = JSON.parse(savedLineup);
    }
    if (savedFormation) {
        currentFormation = savedFormation;
        document.getElementById('formation').value = currentFormation;
    }
}

// Export/Import Data functions
function handleExportData() {
    try {
        const exportData = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            data: {
                players: players,
                lineup: lineup,
                formation: currentFormation
            }
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `fmm-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showBackupMessage('✓ Data exported successfully!', 'success');
    } catch (error) {
        showBackupMessage('Error exporting data. Please try again.', 'error');
        console.error('Export error:', error);
    }
}

function handleImportData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // Validate data structure
            if (!importedData.data || typeof importedData.data !== 'object') {
                throw new Error('Invalid backup file format');
            }

            const { players: importedPlayers, lineup: importedLineup, formation: importedFormation } = importedData.data;

            // Confirm before replacing data
            const hasExistingData = players.length > 0 || lineup.length > 0;
            if (hasExistingData) {
                const confirmed = confirm(
                    'This will replace all your current data. Are you sure you want to continue?\n\n' +
                    `Current data: ${players.length} players\n` +
                    `Import data: ${importedPlayers?.length || 0} players`
                );
                if (!confirmed) {
                    event.target.value = ''; // Reset file input
                    return;
                }
            }

            // Import data
            if (Array.isArray(importedPlayers)) {
                players = importedPlayers;
            }
            if (Array.isArray(importedLineup)) {
                lineup = importedLineup;
            }
            if (importedFormation) {
                currentFormation = importedFormation;
                document.getElementById('formation').value = currentFormation;
            }

            // Save and refresh UI
            saveData();
            renderSquad();
            renderLineup();

            showBackupMessage(
                `✓ Data imported successfully! ${players.length} player${players.length !== 1 ? 's' : ''} loaded.`,
                'success'
            );
        } catch (error) {
            showBackupMessage('Error: Invalid backup file. Please check the file format.', 'error');
            console.error('Import error:', error);
        }
        
        // Reset file input
        event.target.value = '';
    };

    reader.onerror = () => {
        showBackupMessage('Error reading file. Please try again.', 'error');
        event.target.value = '';
    };

    reader.readAsText(file);
}

function showBackupMessage(message, type) {
    const messageDiv = document.getElementById('backup-message');
    messageDiv.textContent = message;
    messageDiv.className = `backup-message ${type}`;
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'backup-message';
    }, 5000);
}

// Service Worker Registration is handled automatically by Vite PWA plugin
