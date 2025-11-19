# ⚽ FMM Tactic Manager

A Progressive Web App (PWA) for managing your Football Manager Mobile squad and starting 11. Build your dream team, organize formations, and track player ratings!

## Features

### 🎮 Player Management
- Add players with comprehensive attributes:
  - **Technical**: Aerial, Crossing, Dribbling, Passing, Shooting, Tackling, Technique
  - **Mental**: Creativity, Decisions, Movement, Aggression, Positioning, Teamwork, Leadership
  - **Physical**: Pace, Stamina, Strength
  - **Goalkeeper**: Agility, Handling, Kicking, Reflexes, Throwing
- **Import players from JSON** files to quickly pre-fill the form
- Search and filter players by position
- View calculated player ratings
- Delete players from your squad

### ⚡ Formation System
Support for 14 popular formations:
- 4-4-2 (Classic)
- 4-3-3 (Attacking)
- 3-5-2 (Wing play)
- 4-2-3-1 (Modern)
- 4-5-1 (Defensive)
- 3-4-3 (Aggressive)
- 5-3-2 (Ultra defensive)
- 4-1-4-1 (Holding midfielder)
- 4-4-1-1 (False 9)
- 3-4-1-2 (Wide midfield diamond)
- 4-1-2-1-2 (Narrow diamond)
- 5-4-1 (Ultra defensive counter)
- 4-3-2-1 (Christmas tree)
- 4-1-3-2 (Narrow attacking)

### 📊 Starting 11 Builder
- Visual pitch representation
- Position-based player selection
- Real-time team average rating calculation
- Easy player assignment and removal
- Formation switching with player retention
- **Drag-and-drop player repositioning** - Drag players between positions to rearrange your lineup
- **Position swapping** - Click the "↔️ Swap" button on two players to swap their positions

### 💾 Data Persistence & Backup
- All data stored locally in browser
- **Export/Import system** for backing up and restoring your data
- Transfer your squad and tactics between different devices
- Offline functionality via Service Worker
- No account or internet required

### 📱 Progressive Web App
- Installable on mobile and desktop
- Works offline
- Responsive design for all screen sizes
- Native app-like experience

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/scilone/fmm-tactic.git
cd fmm-tactic
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To build the app for production:
```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build:
```bash
npm run preview
```

### Usage

#### Adding a Player

**Manual Entry:**
1. Click the "Add Player" tab
2. Enter player name and select position (GK, DEF, MID, FWD)
3. Set attribute values (1-20) for all categories
4. For goalkeepers, additional GK-specific attributes will appear
5. Click "Add Player" to save

**Import from JSON:**
1. Click the "Add Player" tab
2. Click "📁 Import from JSON" button
3. Select a JSON file with player attributes (see example below)
4. The form will be automatically pre-filled with the imported data
5. Review the data and click "Add Player" to save

JSON Format Example:
```json
{
  "name": "Player Name",
  "position": "MID",
  "attributes": {
    "aerial": 12,
    "crossing": 14,
    "dribbling": 16,
    "passing": 17,
    "shooting": 15,
    "tackling": 13,
    "technique": 16,
    "creativity": 17,
    "decisions": 15,
    "movement": 16,
    "aggression": 12,
    "positioning": 15,
    "teamwork": 16,
    "leadership": 14,
    "pace": 15,
    "stamina": 16,
    "strength": 13
  }
}
```

For goalkeepers, add these additional attributes:
```json
{
  "name": "Goalkeeper Name",
  "position": "GK",
  "attributes": {
    // ... all standard attributes ...
    "agility": 17,
    "handling": 18,
    "kicking": 15,
    "reflexes": 18,
    "throwing": 16
  }
}
```

Example JSON files are provided in the repository:
- `example-player.json` - Example field player
- `example-goalkeeper.json` - Example goalkeeper

#### Building Your Starting 11
1. Go to the "Starting 11" tab
2. Select your preferred formation from the dropdown (14 formations available)
3. Click on any position slot (e.g., "GK +", "LB +")
4. Select a player from the available options
5. The team average rating updates automatically

**Rearranging Players:**
- **Drag-and-Drop (Swap)**: Click and hold a player card, then drag it to another filled position to swap players
- **Drag-and-Drop (Move)**: Click and hold a player card, then drag it to an empty position slot (marked with "+") to move the player there
  - Example: In a 4-4-2 formation, drag an MC player to an empty ST slot to effectively convert to a 4-3-3
  - The system validates that the player can play in the target position before allowing the move
- **Swap Button**: Click the "↔️ Swap" button on one player, then click the "↔️ Swap" button on another player to swap their positions
- The selected player will be highlighted with an orange border while in swap mode

#### Managing Your Squad
1. Use the "Squad" tab to view all players
2. Filter by position using the dropdown
3. Search for players by name
4. Click "Add to Lineup" to quickly assign players
5. Click "Delete" to remove players from your squad

#### Backing Up and Restoring Your Data

**Exporting Your Data:**
1. Go to the "Squad" tab
2. Click the "💾 Export Data" button
3. A JSON file will be downloaded with your complete squad, lineup, and formation
4. The file is named `fmm-backup-YYYY-MM-DD.json`

**Importing Your Data:**
1. Go to the "Squad" tab
2. Click the "📂 Import Data" button
3. Select your previously exported backup file
4. Confirm the import (this will replace your current data)
5. Your squad, lineup, and formation will be restored

**Use Cases:**
- Back up your data before clearing browser cache
- Transfer your squad to another device
- Share your team setup with friends
- Keep multiple save files for different tactics

**Example Files:**
- `example-backup.json` - Example backup file format

## Technical Details

### File Structure
```
fmm-tactic/
├── index.html             # Main application structure
├── styles.css             # Responsive styling
├── app.js                 # Application logic
├── manifest.json          # PWA manifest
├── service-worker.js      # Offline functionality
├── icon-192.png           # PWA icon (192x192)
├── icon-512.png           # PWA icon (512x512)
├── example-player.json    # Example player data
├── example-goalkeeper.json # Example goalkeeper data
├── example-backup.json    # Example backup file format
└── README.md             # Documentation
```

### Technologies Used
- Pure HTML5, CSS3, and JavaScript (no frameworks)
- **Vite** - Modern build tool and development server
- **Vite Plugin PWA** - Automated PWA and Service Worker generation
- LocalStorage API for data persistence
- CSS Grid and Flexbox for responsive layout
- PWA features (Web App Manifest)

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

All modern browsers with LocalStorage and Service Worker support.

## Rating System

Player ratings are calculated as the average of all their attributes:
- Standard players: Average of 17 attributes
- Goalkeepers: Average of 22 attributes (17 standard + 5 GK-specific)

Team average rating is the mean of all 11 starting players' ratings.

## Data Storage

All data is stored locally using the browser's LocalStorage API:
- `fmm-players`: Array of all players in your squad
- `fmm-lineup`: Current starting 11 lineup assignments
- `fmm-formation`: Selected formation

**Important**: 
- Clearing browser data will remove all saved information
- Use the Export/Import feature to back up your data before clearing browser cache
- Export files are in JSON format and can be edited manually if needed

## Screenshots

![Squad Management](https://github.com/user-attachments/assets/4bff5759-1926-4400-b6b9-b69a9b8fca6d)
*Manage your squad with search and filtering*

![Add Player Form](https://github.com/user-attachments/assets/5caff879-4eab-4beb-a695-01011a92ee3d)
*Add players with all FMM attributes*

![Starting 11 Formation](https://github.com/user-attachments/assets/f844deec-f3ec-4768-adac-1748be963ef6)
*Visual formation builder*

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

Built for Football Manager Mobile enthusiasts who want to plan their tactics and manage their squads efficiently.