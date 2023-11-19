// NavigationBar.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import useAuthState from '../hooks/useAuthState';
import { logoutService } from '../services/auth';

const NavigationBar: React.FC = () => {
    const user = useAuthState();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const handleUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();
        try {
            await logoutService(); // ここでログアウト処理を実行
            navigate('/login'); // ナビゲーションには navigate を使用
        } catch (error) {
            console.error('Logout failed', error);
            // エラーハンドリング
        }
    };

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
                {user ? (
                    <>
                        <Button
                            aria-controls="user-menu"
                            aria-haspopup="true"
                            onClick={handleUserClick}
                            style={{ color: 'white', marginLeft: 'auto' }}
                        >
                            {user.displayName || user.email}
                        </Button>
                        <Menu
                            id="user-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>プロフィール</MenuItem>
                            <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Button
                        color="inherit"
                        component={Link}
                        to="/login"
                        style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', marginLeft: 'auto' }}
                    >
                        ログイン
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;