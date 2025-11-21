# FMM Tactic Manager - AI Coding Guidelines

## Project Overview
This is a Progressive Web App (PWA) for managing Football Manager Mobile (FMM) squads and tactics. Users can add players with detailed attributes, select formations, and build starting lineups with role-based ratings.

## Architecture
- **Frontend**: Vanilla JavaScript, HTML5, CSS3 with Vite build system
- **Data Storage**: Browser LocalStorage (`fmm-players`, `fmm-lineup`, `fmm-formation`)
- **PWA Features**: Service Worker for offline functionality, Web App Manifest
- **Key Components**:
  - Player management with attribute-based ratings
  - Formation system (14 predefined formations)
  - Visual lineup builder with drag-and-drop
  - JSON import/export for data backup

## Player Rating System
Players have 17 standard attributes (technical, mental, physical) plus 5 GK-specific. Ratings are calculated using role-specific weightings:

```javascript
// Example: Central Defender weighting
ROLE_WEIGHTS['DC']['Central Defender'] = {
    'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0,
    'aerial': 1.5, 'strength': 1.5, 'pace': 0.5
}
```

- **Default rating**: Simple average of all attributes (1-20 scale)
- **Role rating**: Weighted average with position bonuses and critical attribute malus
- **Display**: Color-coded (green ≥15, blue ≥10, orange ≥5, red <5)

## Critical Workflows
- **Add Player**: Manual form entry or JSON import (pre-fills form fields)
- **Build Lineup**: Select formation → assign players to positions → choose roles
- **Player Details**: Modal showing ratings for all playable positions/roles
- **Data Persistence**: Auto-save to LocalStorage, export/import JSON backups

## Code Patterns
- **Event Setup**: `setupEventListeners()` called on DOMContentLoaded
- **Data Management**: `saveData()`/`loadData()` for LocalStorage operations
- **UI Updates**: `renderSquad()`/`renderLineup()` re-render on data changes
- **Modal System**: `createModal()` for dynamic overlays
- **Attribute Handling**: Case-insensitive import, GK attributes toggle visibility

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run preview` - Preview production build

## File Structure Conventions
- `app.js` - Main application logic (single file)
- `styles.css` - Responsive styling
- `index.html` - App structure
- `example-*.json` - Sample data files
- PWA assets in root

## Integration Points
- **No external APIs** - Fully offline-capable
- **JSON Import**: Flexible attribute mapping with case-insensitive keys
- **Formation Data**: Position arrays with labels and roles
- **Drag-and-Drop**: HTML5 drag events for player repositioning

## Common Patterns
- Player positions stored as arrays (e.g., `['DC', 'DL']`)
- Formation slots have `position` and `label` properties
- Ratings displayed with 1 decimal precision
- Error handling via try/catch for JSON operations

## Testing Approach
- Manual UI testing for drag-and-drop and modal interactions
- Validate JSON import with example files
- Check LocalStorage persistence across sessions