//NavigationBar.tsx
import React from 'react';
import { AppBar, Toolbar, IconButton, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => {
    return (
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
    );
};

export default NavigationBar;
