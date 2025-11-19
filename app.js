// FMM Tactic Manager - Main Application

// Data structures
let players = [];
let lineup = [];
let currentFormation = '4-4-2';

// Formation definitions
const formations = {
    '4-4-2': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'LB', position: 'DEF', row: 1 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'RB', position: 'DEF', row: 1 },
        { label: 'LM', position: 'MID', row: 2 },
        { label: 'CM', position: 'MID', row: 2 },
        { label: 'CM', position: 'MID', row: 2 },
        { label: 'RM', position: 'MID', row: 2 },
        { label: 'ST', position: 'FWD', row: 3 },
        { label: 'ST', position: 'FWD', row: 3 }
    ],
    '4-3-3': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'LB', position: 'DEF', row: 1 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'RB', position: 'DEF', row: 1 },
        { label: 'CM', position: 'MID', row: 2 },
        { label: 'CM', position: 'MID', row: 2 },
        { label: 'CM', position: 'MID', row: 2 },
        { label: 'LW', position: 'FWD', row: 3 },
        { label: 'ST', position: 'FWD', row: 3 },
        { label: 'RW', position: 'FWD', row: 3 }
    ],
    '3-5-2': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'LM', position: 'MID', row: 2 },
        { label: 'CM', position: 'MID', row: 2 },
        { label: 'CM', position: 'MID', row: 2 },
        { label: 'CM', position: 'MID', row: 2 },
        { label: 'RM', position: 'MID', row: 2 },
        { label: 'ST', position: 'FWD', row: 3 },
        { label: 'ST', position: 'FWD', row: 3 }
    ],
    '4-2-3-1': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'LB', position: 'DEF', row: 1 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'RB', position: 'DEF', row: 1 },
        { label: 'CDM', position: 'MID', row: 2 },
        { label: 'CDM', position: 'MID', row: 2 },
        { label: 'LM', position: 'MID', row: 3 },
        { label: 'CAM', position: 'MID', row: 3 },
        { label: 'RM', position: 'MID', row: 3 },
        { label: 'ST', position: 'FWD', row: 4 }
    ],
    '4-5-1': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'LB', position: 'DEF', row: 1 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'RB', position: 'DEF', row: 1 },
        { label: 'LM', position: 'MID', row: 2 },
        { label: 'CM', position: 'MID', row: 2 },
        { label: 'CM', position: 'MID', row: 2 },
        { label: 'CM', position: 'MID', row: 2 },
        { label: 'RM', position: 'MID', row: 2 },
        { label: 'ST', position: 'FWD', row: 3 }
    ],
    '3-4-3': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'LM', position: 'MID', row: 2 },
        { label: 'CM', position: 'MID', row: 2 },
        { label: 'CM', position: 'MID', row: 2 },
        { label: 'RM', position: 'MID', row: 2 },
        { label: 'LW', position: 'FWD', row: 3 },
        { label: 'ST', position: 'FWD', row: 3 },
        { label: 'RW', position: 'FWD', row: 3 }
    ],
    '5-3-2': [
        { label: 'GK', position: 'GK', row: 0 },
        { label: 'LWB', position: 'DEF', row: 1 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'CB', position: 'DEF', row: 1 },
        { label: 'RWB', position: 'DEF', row: 1 },
        { label: 'CM', position: 'MID', row: 2 },
        { label: 'CM', position: 'MID', row: 2 },
        { label: 'CM', position: 'MID', row: 2 },
        { label: 'ST', position: 'FWD', row: 3 },
        { label: 'ST', position: 'FWD', row: 3 }
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
        switchTab('squad');
    });

    // Position selector for GK attributes
    const positionSelect = document.getElementById('player-position');
    positionSelect.addEventListener('change', toggleGKAttributes);

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
    const importInput = document.getElementById('import-json');
    importInput.addEventListener('change', handleImportJSON);
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
    const position = document.getElementById('player-position').value;
    const gkSection = document.getElementById('gk-attributes');
    gkSection.style.display = position === 'GK' ? 'block' : 'none';
}

// Handle JSON import
function handleImportJSON(e) {
    const file = e.target.files[0];
    const messageDiv = document.getElementById('import-message');
    
    if (!file) {
        return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            
            // Validate required fields
            if (!data.name || !data.position) {
                showImportMessage('JSON must contain "name" and "position" fields', 'error');
                return;
            }

            // Validate position
            const validPositions = ['GK', 'DEF', 'MID', 'FWD'];
            if (!validPositions.includes(data.position)) {
                showImportMessage('Position must be one of: GK, DEF, MID, FWD', 'error');
                return;
            }

            // Pre-fill the form
            document.getElementById('player-name').value = data.name;
            document.getElementById('player-position').value = data.position;
            
            // Toggle GK attributes visibility if needed
            toggleGKAttributes();

            // Pre-fill attributes if they exist
            if (data.attributes) {
                const attrs = data.attributes;
                
                // Technical attributes
                if (attrs.aerial !== undefined) document.getElementById('attr-aerial').value = attrs.aerial;
                if (attrs.crossing !== undefined) document.getElementById('attr-crossing').value = attrs.crossing;
                if (attrs.dribbling !== undefined) document.getElementById('attr-dribbling').value = attrs.dribbling;
                if (attrs.passing !== undefined) document.getElementById('attr-passing').value = attrs.passing;
                if (attrs.shooting !== undefined) document.getElementById('attr-shooting').value = attrs.shooting;
                if (attrs.tackling !== undefined) document.getElementById('attr-tackling').value = attrs.tackling;
                if (attrs.technique !== undefined) document.getElementById('attr-technique').value = attrs.technique;
                
                // Mental attributes
                if (attrs.creativity !== undefined) document.getElementById('attr-creativity').value = attrs.creativity;
                if (attrs.decisions !== undefined) document.getElementById('attr-decisions').value = attrs.decisions;
                if (attrs.movement !== undefined) document.getElementById('attr-movement').value = attrs.movement;
                if (attrs.aggression !== undefined) document.getElementById('attr-aggression').value = attrs.aggression;
                if (attrs.positioning !== undefined) document.getElementById('attr-positioning').value = attrs.positioning;
                if (attrs.teamwork !== undefined) document.getElementById('attr-teamwork').value = attrs.teamwork;
                if (attrs.leadership !== undefined) document.getElementById('attr-leadership').value = attrs.leadership;
                
                // Physical attributes
                if (attrs.pace !== undefined) document.getElementById('attr-pace').value = attrs.pace;
                if (attrs.stamina !== undefined) document.getElementById('attr-stamina').value = attrs.stamina;
                if (attrs.strength !== undefined) document.getElementById('attr-strength').value = attrs.strength;
                
                // GK-specific attributes (only if goalkeeper)
                if (data.position === 'GK') {
                    if (attrs.agility !== undefined) document.getElementById('attr-agility').value = attrs.agility;
                    if (attrs.handling !== undefined) document.getElementById('attr-handling').value = attrs.handling;
                    if (attrs.kicking !== undefined) document.getElementById('attr-kicking').value = attrs.kicking;
                    if (attrs.reflexes !== undefined) document.getElementById('attr-reflexes').value = attrs.reflexes;
                    if (attrs.throwing !== undefined) document.getElementById('attr-throwing').value = attrs.throwing;
                }
            }

            showImportMessage('✓ Player data imported successfully! Review and click "Add Player" to save.', 'success');
            
            // Clear the file input
            e.target.value = '';
            
        } catch (error) {
            showImportMessage('Error: Invalid JSON format. Please check your file.', 'error');
            e.target.value = '';
        }
    };
    
    reader.onerror = () => {
        showImportMessage('Error: Could not read file.', 'error');
        e.target.value = '';
    };
    
    reader.readAsText(file);
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
function handleAddPlayer(e) {
    e.preventDefault();

    const player = {
        id: Date.now(),
        name: document.getElementById('player-name').value,
        position: document.getElementById('player-position').value,
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

    players.push(player);
    saveData();
    
    e.target.reset();
    switchTab('squad');
    renderSquad();
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
                <button class="btn btn-danger btn-small" onclick="deletePlayer(${player.id})">
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Delete player
function deletePlayer(id) {
    if (confirm('Are you sure you want to delete this player?')) {
        players = players.filter(p => p.id !== id);
        lineup = lineup.filter(slot => slot.playerId !== id);
        saveData();
        renderSquad();
        renderLineup();
    }
}

// Add to lineup (show modal)
function addToLineup(playerId) {
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
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
}

// Assign player to slot
function assignToSlot(playerId, slotIndex) {
    lineup.push({ slotIndex, playerId });
    saveData();
    renderLineup();
    closeModal();
}

// Remove from lineup
function removeFromLineup(slotIndex) {
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
function selectPlayerForSlot(slotIndex, position) {
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
