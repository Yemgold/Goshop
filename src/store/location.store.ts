


// C:\ecomBackup\frontendt\src\store\location.store.ts

import { create } from "zustand";

import { states } from "../data/states";
import { townsByState } from "../data/towns";

interface LocationStore {
  states: typeof states;

  townsByState: typeof townsByState;

  selectedState: string;
  selectedTown: string;

  setSelectedState: (state: string) => void;
  setSelectedTown: (town: string) => void;

  getTownsByState: (state: string) => string[];

  resetLocation: () => void;
}

export const useLocationStore = create<LocationStore>((set, get) => ({
  states,

  townsByState,

  selectedState: "",
  selectedTown: "",

  setSelectedState: (state) =>
    set({
      selectedState: state,
      selectedTown: "",
    }),

  setSelectedTown: (town) =>
    set({
      selectedTown: town,
    }),

  getTownsByState: (state) => {
    const allTowns = get().townsByState;

    return allTowns[state] ?? [];
  },

  resetLocation: () =>
    set({
      selectedState: "",
      selectedTown: "",
    }),
}));