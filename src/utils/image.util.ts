

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getImageUrl = (path?: string) => {
  if (!path) return "/placeholder.png";

  if (path.startsWith("http")) return path;

  return `${API_BASE}${path}`;
};