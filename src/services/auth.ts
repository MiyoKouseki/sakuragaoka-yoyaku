// src/services/auth.ts

import { auth } from '../firebaseConfig';

export const logoutService = async () => {
  await auth.signOut();
};
