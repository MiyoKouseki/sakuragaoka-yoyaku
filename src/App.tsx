import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toolbar, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import NavigationBar from './components/NavigationBar';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    palette: {
        primary: {
            main: '#FFB6C1', // 桜の色に合わせたピンク
        },
    },
    components: {
        MuiContainer: {
          styleOverrides: {
            root: { // 'root'はContainerコンポーネントのルートスタイルに対応します
              paddingTop: 0, // 上のパディングを0に
              paddingBottom: 0, // 下のパディングを0に
            },
          },
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
                        <Toolbar variant="dense" />
                        <AppRoutes />
                    </Container>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;
