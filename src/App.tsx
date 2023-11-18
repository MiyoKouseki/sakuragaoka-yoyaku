import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import OrganizationForm from './OrganizationForm';
import OrganizationList from './OrganizationList';
import OrganizationEditForm from './OrganizationEditForm';
import RoomForm from './RoomForm';
import RoomList from './RoomList';
import RoomEditForm from './RoomEditForm';
import Yoyaku from './Yoyaku';
import YoyakuForm from './reservationForm';
import { AppBar, Toolbar, Button, IconButton, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';


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
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
                            <HomeIcon style={{ color: 'white' }} />
                        </IconButton>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/organization/list"
                            style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}
                        >
                            団体
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/rooms/list"
                            style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}
                        >
                            部屋
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/reservations/list"
                            style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}
                        >
                            予約
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Toolbar /> {/* この行を追加 */}
                    <Routes>
                        <Route path="/" element={<Yoyaku />} />
                        <Route path="/yoyaku/register" element={<YoyakuForm />} />
                        <Route path="/organization/register" element={<OrganizationForm />} />
                        <Route path="/organization/list" element={<OrganizationList />} />
                        <Route path="/organization/edit/:documentId" element={<OrganizationEditForm />} />
                        <Route path="/rooms/register" element={<RoomForm />} />
                        <Route path="/rooms/list" element={<RoomList />} />
                        <Route path="/rooms/edit/:documentId" element={<RoomEditForm />} />
                    </Routes>
                </Container>
            </Router>
        </ThemeProvider>
    );
}

export default App;
