export const ROLE_WEIGHTS = {
    'GK': {
        'Goalkeeper': {
            'handling': 2.0, 'aerial': 1.5, 'throwing': 1.5,
            'kicking': 1.5, 'reflexes': 2.0,
            'positioning': 1.0, 'decisions': 1.0, 'strength': 0.5
        },
        'Sweeper Keeper': {
            'handling': 1.5, 'aerial': 1.0, 'throwing': 1.0,
            'reflexes': 1.5, 'technique': 1.0, 'pace': 1.0,
            'positioning': 0.5, 'decisions': 0.5
        }
    },
    'DC': {
        'Central Defender': {
            'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0,
            'aerial': 1.5, 'strength': 1.5, 'pace': 0.5
        },
        'No-Nonsense Center-Back': {
            'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0,
            'strength': 1.5, 'aerial': 1.5
        },
        'Ball Playing Defender': {
            'tackling': 1.5, 'positioning': 1.5, 'decisions': 1.5,
            'passing': 1.0, 'dribbling': 0.5, 'aerial': 0.5
        },
        'Wide Center Back': {
            'tackling': 1.5, 'positioning': 1.5, 'decisions': 1.5,
            'passing': 1.0
        },
        'Libero': {
            'movement': 1.0, 'decisions': 1.0, 'creativity': 1.0,
            'shooting': 1.0, 'pace': 1.0
        }
    },
    'DL': {
        'Full-Back': {
            'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0,
            'pace': 1.5, 'passing': 1.5
        },
        'Inverted Full Back': {
            'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0,
            'passing': 1.5
        },
        'Inverted Wing Back': {
            'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0,
            'pace': 1.5, 'passing': 1.5
        },
        'Defensive Full Back': {
            'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0,
            'pace': 1.5
        },
        'Wing-Back': {
            'stamina': 1.5, 'positioning': 2.0, 'pace': 2.0, 'crossing': 1.5, 'dribbling': 1.5
        }
    },
    'DR': {
        'Full-Back': {
            'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0,
            'pace': 1.5, 'passing': 1.5
        },
        'Inverted Full Back': {
            'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0,
            'passing': 1.5
        },
        'Inverted Wing Back': {
            'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0,
            'pace': 1.5, 'passing': 1.5
        },
        'Defensive Full Back': {
            'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0,
            'pace': 1.5
        },
        'Wing-Back': {
            'stamina': 1.5, 'positioning': 2.0, 'pace': 2.0, 'crossing': 1.5, 'dribbling': 1.5
        }
    },
    'WBL': {
        'Wing-Back': {
            'stamina': 1.5, 'positioning': 2.0, 'pace': 2.0, 'crossing': 1.5, 'dribbling': 1.5
        },
        'Inverted Wing Back': {
            'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0,
            'pace': 1.5, 'passing': 1.5
        }
    },
    'WBR': {
        'Wing-Back': {
            'stamina': 1.5, 'positioning': 2.0, 'pace': 2.0, 'crossing': 1.5, 'dribbling': 1.5
        },
        'Inverted Wing Back': {
            'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0,
            'pace': 1.5, 'passing': 1.5
        }
    },
    'DMC': {
        'Defensive Midfielder': {
            'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0
        },
        'Anchor': {
            'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0,
            'strength': 1.5
        },
        'Roaming Playmaker': {
            'decisions': 2.0, 'movement': 1.5, 'creativity': 1.5, 'shooting': 1.5, 'passing': 1.5, 'teamwork': 1.0
        },
        'Deep Lying Playmaker': {
            'passing': 2.0, 'creativity': 1.5, 'movement': 1.5, 'decisions': 2.0
        },
        'Ball Winning Midfielder': {
            'tackling': 2.0, 'positioning': 2.0, 'aerial': 1.5, 'strength': 1.5, 'decisions': 2.0
        }
    },
    'MC': {
        'Central Midfielder': {
            'aerial': 1.5, 'movement': 1.5, 'passing': 2.0, 'decisions': 2.0, 'tackling': 1.5, 'positioning': 2.0
        },
        'Anchor': {
            'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0,
            'strength': 1.5
        },
        'Box To Box Midfielder': {
            'movement': 1.5, 'positioning': 2.0, 'stamina': 1.5, 'decisions': 2.0, 'tackling': 1.5, 'passing': 1.5
        },
        'Roaming Playmaker': {
            'decisions': 2.0, 'movement': 1.5, 'creativity': 1.5, 'shooting': 1.5, 'passing': 1.5, 'teamwork': 1.0
        },
        'Deep Lying Playmaker': {
            'passing': 2.0, 'creativity': 1.5, 'movement': 1.5, 'decisions': 2.0
        },
        'Ball Winning Midfielder': {
            'tackling': 2.0, 'positioning': 2.0, 'aerial': 1.5, 'strength': 1.5, 'decisions': 2.0
        },
        'Advanced Playmaker': {
            'passing': 2.0, 'creativity': 1.5, 'movement': 1.5, 'decisions': 2.0
        }
    },
    'ML': {
        'Wide Midfielder': {
            'passing': 2.0, 'positioning': 2.0, 'movement': 1.5, 'decisions': 2.0, 'tackling': 1.5
        },
        'Defensive Winger': {
            'crossing': 1.5, 'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0, 'passing': 1.5
        },
        'Winger': {
            'crossing': 1.5, 'dribbling': 1.5, 'movement': 1.5, 'decisions': 2.0, 'pace': 2.0
        },
        'Inverted Winger': {
            'movement': 1.5, 'dribbling': 1.5, 'positioning': 2.0, 'decisions': 2.0, 'passing': 2.0
        }
    },
    'MR': {
        'Wide Midfielder': {
            'passing': 2.0, 'positioning': 2.0, 'movement': 1.5, 'decisions': 2.0, 'tackling': 1.5
        },
        'Defensive Winger': {
            'crossing': 1.5, 'tackling': 2.0, 'positioning': 2.0, 'decisions': 2.0, 'passing': 1.5
        },
        'Winger': {
            'crossing': 1.5, 'dribbling': 1.5, 'movement': 1.5, 'decisions': 2.0, 'pace': 2.0
        },
        'Inverted Winger': {
            'movement': 1.5, 'dribbling': 1.5, 'positioning': 2.0, 'decisions': 2.0, 'passing': 2.0
        }
    },
    'AML': {
        'Winger': {
            'crossing': 1.5, 'dribbling': 1.5, 'movement': 1.5, 'decisions': 2.0, 'pace': 2.0
        },
        'Advanced Playmaker': {
            'passing': 2.0, 'creativity': 1.5, 'movement': 1.5, 'decisions': 2.0
        },
        'Inside Forward': {
            'shooting': 2.0, 'dribbling': 1.5, 'movement': 1.5, 'pace': 1.5, 'decisions': 2.0, 'passing': 1.5
        },
        'Inverted Winger': {
            'movement': 1.5, 'dribbling': 1.5, 'positioning': 2.0, 'decisions': 2.0, 'passing': 2.0
        }
    },
    'AMR': {
        'Winger': {
            'crossing': 1.5, 'dribbling': 1.5, 'movement': 1.5, 'decisions': 2.0, 'pace': 2.0
        },
        'Advanced Playmaker': {
            'passing': 2.0, 'creativity': 1.5, 'movement': 1.5, 'decisions': 2.0
        },
        'Inside Forward': {
            'shooting': 2.0, 'dribbling': 1.5, 'movement': 1.5, 'pace': 1.5, 'decisions': 2.0, 'passing': 1.5
        },
        'Inverted Winger': {
            'movement': 1.5, 'dribbling': 1.5, 'positioning': 2.0, 'decisions': 2.0, 'passing': 2.0
        }
    },
    'AMC': {
        'Attacking Midfielder': {
            'movement': 1.5, 'passing': 2.0, 'decisions': 2.0
        },
        'Trequartista': {
            'movement': 1.5, 'decisions': 2.0, 'creativity': 1.5, 'shooting': 1.5, 'pace': 1.5, 'strength': 0.5, 'aerial': 0.5
        },
        'Advanced Playmaker': {
            'passing': 2.0, 'creativity': 1.5, 'movement': 1.5, 'decisions': 2.0
        },
        'Shadow Striker': {
            'movement': 1.5, 'decisions': 2.0, 'creativity': 1.5, 'shooting': 1.5, 'pace': 1.5
        }
    },
    'ST': {
        'Poacher': {
            'movement': 1.5, 'pace': 1.5, 'technique': 1.0, 'shooting': 2.0, 'decisions': 2.0
        },
        'Deep Lying Forward': {
            'movement': 1.5, 'decisions': 2.0, 'creativity': 1.5, 'passing': 2.0
        },
        'Complete Forward': {
            'movement': 1.5, 'decisions': 2.0, 'creativity': 1.5, 'shooting': 2.0, 'pace': 1.5, 'strength': 0.5, 'aerial': 0.5
        },
        'Trequartista': {
            'movement': 1.5, 'decisions': 2.0, 'creativity': 1.5, 'shooting': 1.5, 'pace': 1.5, 'strength': 0.5, 'aerial': 0.5
        },
        'Target Forward': {
            'strength': 1.5, 'aerial': 1.5, 'movement': 1.5, 'shooting': 2.0
        },
        'Advanced Forward': {
            'movement': 1.5, 'decisions': 2.0, 'shooting': 2.0, 'pace': 1.5
        },
        'Pressing Forward': {
            'movement': 1.5, 'decisions': 2.0, 'strength': 0.5, 'teamwork': 1.0, 'tackling': 1.5
        }
    }
};

export const POSITION_FREQUENCY = {
  'GK': {
    'handling': 2/2, 'reflexes': 2/2, 'aerial': 2/2,
    'kicking': 2/2, 'throwing': 2/2, 'positioning': 1/2,
    'decisions': 1/2, 'technique': 1/2, 'pace': 1/2
  },
  'DC': {
    'tackling': 5/6, 'positioning': 6/6, 'decisions': 6/6,
    'aerial': 3/6, 'strength': 3/6, 'passing': 2/6,
    'pace': 1/6, 'dribbling': 1/6, 'movement': 1/6, 'creativity': 1/6, 'shooting': 1/6
  }
};