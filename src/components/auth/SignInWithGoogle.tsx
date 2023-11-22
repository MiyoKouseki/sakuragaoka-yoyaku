// SignInWithGoogle.tsx
import React from 'react';
import Button from '@mui/material/Button';
import { auth, googleProvider } from '../../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

const SignInWithGoogle: React.FC = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={signInWithGoogle}>
      Sign in with Google
    </Button>
  );
};

export default SignInWithGoogle;
