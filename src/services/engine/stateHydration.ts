

export const getSafeState = (state?: string | null) => {
  return typeof state === "string" ? state.trim() : "";
};

export const isHydrated = (buyerState?: string, items?: any[]) => {
  return Boolean(getSafeState(buyerState)) && Array.isArray(items) && items.length > 0;
};