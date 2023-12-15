import { create } from 'zustand';
import { User } from '../types';

type Store = {
  user: User | null,
  setUser: (user: User | null) => void;
  loadingUser: boolean;
  setLoadingUser: (loadingUser: boolean) => void;
  feedScrollListener: number;
  scrollFeed: () => void;
  hasAccount: boolean;
  setHasAccount: (hasAccount: boolean) => void;
  activeDiaryId: string | null;
  setActiveDiaryId: (activeDiaryId: string | null) => void;
};

const defaultStore = create<Store>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  loadingUser: true,
  setLoadingUser: (loadingUser: boolean) => set({ loadingUser }),
  feedScrollListener: 0,
  scrollFeed: () => set(state => ({ feedScrollListener: state.feedScrollListener + 1 })),
  hasAccount: false,
  setHasAccount: (hasAccount: boolean) => set({ hasAccount }),
  activeDiaryId: null,
  setActiveDiaryId: (activeDiaryId: string | null) => set({ activeDiaryId })
}));

export default defaultStore;