import { User } from '@/types';
import { mockUsers } from './mockData';
import { generateId } from '@/lib/utils';

const STORAGE_KEY = 'hr_auth_user';

function getUsers(): User[] {
  if (typeof window === 'undefined') return [...mockUsers];
  const stored = localStorage.getItem('hr_users');
  if (stored) {
    return [...mockUsers, ...JSON.parse(stored)];
  }
  return [...mockUsers];
}

function saveCustomUsers(users: User[]) {
  const customOnly = users.filter((u) => !mockUsers.find((m) => m.id === u.id));
  localStorage.setItem('hr_users', JSON.stringify(customOnly));
}

export const authService = {
  async login(email: string, _password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    await new Promise((r) => setTimeout(r, 500));
    const users = getUsers();
    const user = users.find((u) => u.email === email);
    if (!user) return { success: false, error: 'No account found with this email.' };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  async register(data: { name: string; email: string; phone: string; password: string }): Promise<{ success: boolean; user?: User; error?: string }> {
    await new Promise((r) => setTimeout(r, 500));
    const users = getUsers();
    if (users.find((u) => u.email === data.email)) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser: User = {
      id: generateId(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'customer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const customUsers = users.filter((u) => !mockUsers.find((m) => m.id === u.id));
    customUsers.push(newUser);
    saveCustomUsers(customUsers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
  },

  async resetPassword(_email: string): Promise<{ success: boolean; error?: string }> {
    await new Promise((r) => setTimeout(r, 500));
    return { success: true };
  },

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  },

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  },
};
