import { db, auth, ADMIN_EMAIL, ADMIN_PASSWORD } from './firebase';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
  limit,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { mockRoomTypes, mockRooms } from '@/services/mockData';
import { User } from '@/types';

let seedPromise: Promise<void> | null = null;

export function ensureSeeded() {
  if (typeof window === 'undefined') return Promise.resolve();
  if (!seedPromise) seedPromise = doSeed();
  return seedPromise;
}

async function doSeed() {
  try {
    await seedRoomTypes();
    await seedPhysicalRooms();
    await seedAdmin();
  } catch (err) {
    seedPromise = null;
    console.error('[firebase-seed]', err);
  }
}

async function seedRoomTypes() {
  const snap = await getDocs(query(collection(db, 'roomTypes'), limit(1)));
  if (!snap.empty) return;
  for (const rt of mockRoomTypes) {
    await setDoc(doc(db, 'roomTypes', rt.id), rt);
  }
}

async function seedPhysicalRooms() {
  const snap = await getDocs(query(collection(db, 'rooms'), limit(1)));
  if (!snap.empty) return;
  for (const room of mockRooms) {
    await setDoc(doc(db, 'rooms', room.id), room);
  }
}

async function seedAdmin() {
  let methods: string[] = [];
  try {
    methods = await fetchSignInMethodsForEmail(auth, ADMIN_EMAIL);
  } catch {
    return;
  }

  const ensureAdminDoc = async (uid: string) => {
    const existing = await getDoc(doc(db, 'users', uid));
    if (existing.exists()) return;
    const adminUser: User = {
      id: uid,
      name: 'Admin',
      email: ADMIN_EMAIL,
      phone: '+916200760138',
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'users', uid), adminUser);
  };

  const hadPassword = methods.includes('password');
  if (hadPassword) {
    try {
      const cred = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      await ensureAdminDoc(cred.user.uid);
      await signOut(auth);
    } catch {
      // Admin auth exists with a password we don't know — nothing to seed.
    }
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
    await ensureAdminDoc(cred.user.uid);
    await signOut(auth);
  } catch (err: any) {
    if (err?.code === 'auth/email-already-in-use') return;
    console.error('[firebase-seed] admin:', err);
  }
}