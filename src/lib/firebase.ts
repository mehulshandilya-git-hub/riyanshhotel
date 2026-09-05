import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { User } from '@/types';

export const firebaseConfig = {
  apiKey: 'AIzaSyAsCPh8TJ5vPkxR8G0J2BGVnFrAe0Bz5nA',
  authDomain: 'riyansh-hotel.firebaseapp.com',
  projectId: 'riyansh-hotel',
  storageBucket: 'riyansh-hotel.firebasestorage.app',
  messagingSenderId: '1097898401219',
  appId: '1:1097898401219:web:3851c1943bf435ee6cb176',
  measurementId: 'G-BM13SCLVMS',
};

export const ADMIN_EMAIL = 'admin@hotelriyansh.com';
export const ADMIN_PASSWORD = 'admin123';

let app = getApps()[0];
if (!app) {
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const db = getFirestore(app);

const AUTH_SESSION_KEY = 'hr_auth_user';

export async function authDoc<T = User>(uid: string): Promise<T | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? (snap.data() as T) : null;
}

export function hydrateSessionUser(user: User | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_SESSION_KEY);
  }
}

export function keepUserInSync(uid: string) {
  if (typeof window === 'undefined') return undefined;
  return onSnapshot(doc(db, 'users', uid), (snap) => {
    if (snap.exists()) {
      hydrateSessionUser({ ...(snap.data() as User), id: uid });
    }
  });
}