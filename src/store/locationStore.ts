import { create } from 'zustand';

interface LocationState {
  city: string | null;
  setCity: (city: string) => void;
  clearCity: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  city: localStorage.getItem('selectedCity'),
  setCity: (city) => {
    localStorage.setItem('selectedCity', city);
    set({ city });
  },
  clearCity: () => {
    localStorage.removeItem('selectedCity');
    set({ city: null });
  },
}));