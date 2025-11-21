import { ROLE_WEIGHTS, POSITION_FREQUENCY } from '../config/rating.js';
import { getPlayerPositions } from '../models/state.js';

export function calculateRating(player, position = null, role = null) {
  const attrs = player.attributes || {};
  const isGK = getPlayerPositions(player).includes('GK');

  if (position && role && ROLE_WEIGHTS[position] && ROLE_WEIGHTS[position][role]) {
    const baseWeights = ROLE_WEIGHTS[position][role];
    const freq = POSITION_FREQUENCY[position] || {};
    const finalWeights = {};

    for (const attr in baseWeights) {
      const weight = baseWeights[attr];
      const bonus = freq[attr] || 0;
      finalWeights[attr] = weight * (1 + bonus);
    }

    let totalWeight = 0;
    let weightedSum = 0;

    for (const attr in finalWeights) {
      const weight = finalWeights[attr];
      const value = attrs[attr] || 0;
      weightedSum += value * weight;
      totalWeight += weight;
    }

    let score = weightedSum / totalWeight;
    let rating = score;

    for (const attr in finalWeights) {
      if (finalWeights[attr] >= 2.0 && (attrs[attr] || 0) < 10) {
        rating *= 0.9;
        break;
      }
    }

    return rating.toFixed(1);
  }

  const standardAttrs = isGK
    ? ['aerial','technique','creativity','decisions','aggression','positioning','teamwork','pace','stamina','strength','leadership']
    : ['aerial','crossing','dribbling','passing','shooting','tackling','technique','creativity','decisions','movement','aggression','positioning','teamwork','pace','stamina','strength','leadership'];

  let sum = 0;
  let count = 0;

  standardAttrs.forEach(a => { sum += (attrs[a] || 0); count++; });

  if (isGK) {
    ['agility','handling','kicking','reflexes','throwing'].forEach(a => {
      if (attrs[a] !== undefined) { sum += attrs[a]; count++; }
    });
  }

  return (sum / (count || 1)).toFixed(1);
}