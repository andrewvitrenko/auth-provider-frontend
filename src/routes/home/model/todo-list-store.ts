import { create } from 'zustand';

import type { TTodoListStore } from './todo-list-store.types';

export const useTodoListStore = create<TTodoListStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));
