// LoginPage.tsx
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SignInWithGoogle from './SignInWithGoogle';

const LoginPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box mt={3}>
          <SignInWithGoogle />
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
