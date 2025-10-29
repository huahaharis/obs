import type { User } from '../types/user';

export type State = {
  users: User[];
  loading: boolean; 
  actionLoading: boolean; 
  error?: string;
  fetchUsers: () => Promise<void>;
  addUser: (u: Omit<User, 'id' | 'photo'>) => Promise<void>;
  updateUser: (id: number, patch: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  reset: () => void;
};