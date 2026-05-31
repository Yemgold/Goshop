

import type { Order } from "../types/vendor/vendor.types"; 
import { riders } from "../data/riders";
import { getTrafficMultiplier } from "./traffic";

/**
 * SMART DISPATCH V2
 * Traffic + workload + rating based scoring
 */

export function assignRider(_order: Order) {
  const available = riders.filter((r) => r.isAvailable);

  if (available.length === 0) return null;

  const traffic = getTrafficMultiplier();

  const scored = available.map((rider) => {
    const score =
      rider.distanceScore * 2 +
      rider.activeJobs * 3 +
      traffic * 2 -
      rider.rating * 1.5;

    return {
      rider,
      score,
    };
  });

  scored.sort((a, b) => a.score - b.score);

  return scored[0].rider;
}