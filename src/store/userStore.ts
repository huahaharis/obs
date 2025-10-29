import { create } from "zustand";
import type { User } from '../types/user';
import { fetchDefaultUsers } from '../utils/api';
import type { State } from "../types/store";

export const useUserStore = create<State>((set, get) => ({
  users: [],
  loading: false,
  actionLoading: false,
  error: undefined,

  fetchUsers: async () => {
    set({ loading: true });
    await new Promise((r) => setTimeout(r, 1000));
    try {
      const data = await fetchDefaultUsers();
      set({ users: data, loading: false, error: undefined });
    } catch (err: any) {
      set({ loading: false, error: err.message ?? 'Failed to load' });
    }
  },

  addUser: async (u) => {
    set({ loading: true });
    await new Promise((r) => setTimeout(r, 1000));
    const users = get().users;
    const id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
    const newUser: User = { ...u, id, image: `https://picsum.photos/seed/${id}/100/100` };
    set({ users: [newUser, ...users], loading: false,});
  },

  updateUser: async (id, patch) => {
    set({ loading: true });
    await new Promise((r) => setTimeout(r, 1000));
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...patch } : u)),
      loading: false,
    }));
  },

  deleteUser: async (id) => {
    set({ loading: true });
    await new Promise((r) => setTimeout(r, 1000));
    set((state) => ({ users: state.users.filter((u) => u.id !== id), loading: false }));
  },
  reset: () => set({ users: [], loading: false, actionLoading: false, error: undefined }),
}));
