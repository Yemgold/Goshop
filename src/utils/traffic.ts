

export function getTrafficMultiplier() {
  const hour = new Date().getHours();

  if (hour >= 7 && hour <= 10) return 1.5; // morning rush
  if (hour >= 17 && hour <= 20) return 1.8; // evening rush

  return 1.0; // normal traffic
}