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
        { label: 'LB', position: 'DL', row: 1 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'RB', position: 'DR', row: 1 },
        { label: 'LM', position: 'ML', row: 2 },
        { label: 'CM', position: 'MC', row: 2 },
        { label: 'CM', position: 'MC', row: 2 },
        { label: 'RM', position: 'MR', row: 2 },
        { label: 'ST', position: 'ST', row: 3 },
        { label: 'ST', position: 'ST', row: 3 }
    ],
    '4-3-3': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'LB', position: 'DL', row: 1 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'RB', position: 'DR', row: 1 },
        { label: 'CM', position: 'MC', row: 2 },
        { label: 'CM', position: 'MC', row: 2 },
        { label: 'CM', position: 'MC', row: 2 },
        { label: 'LW', position: 'AML', row: 3 },
        { label: 'ST', position: 'ST', row: 3 },
        { label: 'RW', position: 'AMR', row: 3 }
    ],
    '3-5-2': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'LM', position: 'ML', row: 2 },
        { label: 'CM', position: 'MC', row: 2 },
        { label: 'CM', position: 'MC', row: 2 },
        { label: 'CM', position: 'MC', row: 2 },
        { label: 'RM', position: 'MR', row: 2 },
        { label: 'ST', position: 'ST', row: 3 },
        { label: 'ST', position: 'ST', row: 3 }
    ],
    '4-2-3-1': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'LB', position: 'DL', row: 1 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'RB', position: 'DR', row: 1 },
        { label: 'CDM', position: 'DMC', row: 2 },
        { label: 'CDM', position: 'DMC', row: 2 },
        { label: 'LM', position: 'AML', row: 3 },
        { label: 'CAM', position: 'AMC', row: 3 },
        { label: 'RM', position: 'AMR', row: 3 },
        { label: 'ST', position: 'ST', row: 4 }
    ],
    '4-5-1': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'LB', position: 'DL', row: 1 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'RB', position: 'DR', row: 1 },
        { label: 'LM', position: 'ML', row: 2 },
        { label: 'CM', position: 'MC', row: 2 },
        { label: 'CM', position: 'MC', row: 2 },
        { label: 'CM', position: 'MC', row: 2 },
        { label: 'RM', position: 'MR', row: 2 },
        { label: 'ST', position: 'ST', row: 3 }
    ],
    '3-4-3': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'LM', position: 'ML', row: 2 },
        { label: 'CM', position: 'MC', row: 2 },
        { label: 'CM', position: 'MC', row: 2 },
        { label: 'RM', position: 'MR', row: 2 },
        { label: 'LW', position: 'AML', row: 3 },
        { label: 'ST', position: 'ST', row: 3 },
        { label: 'RW', position: 'AMR', row: 3 }
    ],
    '5-3-2': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'LWB', position: 'WBL', row: 1 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'CB', position: 'DC', row: 1 },
        { label: 'RWB', position: 'WBR', row: 1 },
        { label: 'CM', position: 'MC', row: 2 },
        { label: 'CM', position: 'MC', row: 2 },
        { label: 'CM', position: 'MC', row: 2 },
        { label: 'ST', position: 'ST', row: 3 },
        { label: 'ST', position: 'ST', row: 3 }
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
    const positionRadios = document.querySelectorAll('input[name="position"]');
    positionRadios.forEach(radio => {
        radio.addEventListener('change', toggleGKAttributes);
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
function toggleGKAttributes() {
    const selectedPosition = document.querySelector('input[name="position"]:checked');
    const position = selectedPosition ? selectedPosition.value : '';
    const gkSection = document.getElementById('gk-attributes');
    gkSection.style.display = position === 'GK' ? 'block' : 'none';
}

// Add or Edit player
function handleAddPlayer(e) {
    e.preventDefault();

    const selectedPosition = document.querySelector('input[name="position"]:checked');
    if (!selectedPosition) {
        alert('Please select a position');
        return;
    }

    const player = {
        id: editingPlayerId || Date.now(),
        name: document.getElementById('player-name').value,
        position: selectedPosition.value,
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
    if (player.position === 'GK') {
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
    if (player.position === 'GK') {
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
        const matchesPosition = positionFilter === 'all' || player.position === positionFilter;
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
                <span class="player-position">${player.position}</span>
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
    const positionRadio = document.querySelector(`input[name="position"][value="${player.position}"]`);
    if (positionRadio) {
        positionRadio.checked = true;
    }
    
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
    if (player.position === 'GK') {
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
            return !slotFilled && slot.position === player.position;
        });

    if (availableSlots.length === 0) {
        alert(`No available ${player.position} positions in current formation`);
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

// Assign player to slot
window.assignToSlot = function assignToSlot(playerId, slotIndex) {
    lineup.push({ slotIndex, playerId });
    saveData();
    renderLineup();
    closeModal();
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

    const rowsHTML = Object.keys(rows).sort().map(rowNum => {
        const rowSlots = rows[rowNum];
        const slotsHTML = rowSlots.map(slot => {
            const assignment = lineup.find(l => l.slotIndex === slot.index);
            const player = assignment ? players.find(p => p.id === assignment.playerId) : null;

            if (player) {
                return `
                    <div class="position-slot filled">
                        <div class="position-label">${slot.label}</div>
                        <div class="position-player">${player.name}</div>
                        <div class="position-rating">${calculateRating(player)}</div>
                        <button class="position-remove" onclick="removeFromLineup(${slot.index})">Remove</button>
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
        if (p.position !== position) return false;
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
                        <span>${player.position}</span>
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

// Service Worker Registration is handled automatically by Vite PWA plugin
