# ⚽ FMM Tactic Manager

A Progressive Web App (PWA) for managing your Football Manager Mobile squad and starting 11. Build your dream team, organize formations, and track player ratings!

## Features

### 🎮 Player Management
- Add players with comprehensive attributes:
  - **Technical**: Aerial, Crossing, Dribbling, Passing, Shooting, Tackling, Technique
  - **Mental**: Creativity, Decisions, Movement, Aggression, Positioning, Teamwork, Leadership
  - **Physical**: Pace, Stamina, Strength
  - **Goalkeeper**: Agility, Handling, Kicking, Reflexes, Throwing
- Search and filter players by position
- View calculated player ratings
- Delete players from your squad

### ⚡ Formation System
Support for 7 popular formations:
- 4-4-2 (Classic)
- 4-3-3 (Attacking)
- 3-5-2 (Wing play)
- 4-2-3-1 (Modern)
- 4-5-1 (Defensive)
- 3-4-3 (Aggressive)
- 5-3-2 (Ultra defensive)

### 📊 Starting 11 Builder
- Visual pitch representation
- Position-based player selection
- Real-time team average rating calculation
- Easy player assignment and removal
- Formation switching with player retention

### 💾 Data Persistence
- All data stored locally in browser
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
1. Click the "Add Player" tab
2. Enter player name and select position (GK, DEF, MID, FWD)
3. Set attribute values (1-20) for all categories
4. For goalkeepers, additional GK-specific attributes will appear
5. Click "Add Player" to save

#### Building Your Starting 11
1. Go to the "Starting 11" tab
2. Select your preferred formation from the dropdown
3. Click on any position slot (e.g., "GK +", "LB +")
4. Select a player from the available options
5. The team average rating updates automatically

#### Managing Your Squad
1. Use the "Squad" tab to view all players
2. Filter by position using the dropdown
3. Search for players by name
4. Click "Add to Lineup" to quickly assign players
5. Click "Delete" to remove players from your squad

## Technical Details

### File Structure
```
fmm-tactic/
├── index.html          # Main application structure
├── styles.css          # Responsive styling
├── app.js              # Application logic
├── manifest.json       # PWA manifest
├── service-worker.js   # Offline functionality
├── icon-192.png        # PWA icon (192x192)
├── icon-512.png        # PWA icon (512x512)
└── README.md          # Documentation
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

**Note**: Clearing browser data will remove all saved information.

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