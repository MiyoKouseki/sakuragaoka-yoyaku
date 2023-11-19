import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toolbar, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import NavigationBar from './components/NavigationBar';
import AppRoutes from './components/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFB6C1', // 桜の色に合わせたピンク
        },
    },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <AuthProvider>
                    < NavigationBar />
                    <Container>
                        <Toolbar />
                        <AppRoutes />
                    </Container>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;
