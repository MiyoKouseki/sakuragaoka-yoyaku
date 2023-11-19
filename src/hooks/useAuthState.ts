// useAuthState.ts
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { User } from 'firebase/auth';

const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useAuthState;
