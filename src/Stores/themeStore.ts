import { create } from 'zustand';
import { BrandTheme, LightTheme } from '../Theme/themes';

type Store = {
  theme: BrandTheme,
  setTheme: (theme: BrandTheme) => void;
};

const store = create<Store>((set) => ({
  theme: LightTheme,
  setTheme: (theme: BrandTheme) => set({ theme })
}));

export default store;