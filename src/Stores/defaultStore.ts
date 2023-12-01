import { create } from 'zustand';
import { User } from '../types';

type Store = {
  user: User | null,
  setUser: (user: User | null) => void;
  loadingUser: boolean;
  setLoadingUser: (loadingUser: boolean) => void;
};

const defaultStore = create<Store>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  loadingUser: true,
  setLoadingUser: (loadingUser: boolean) => set({ loadingUser })
}));

export default defaultStore;