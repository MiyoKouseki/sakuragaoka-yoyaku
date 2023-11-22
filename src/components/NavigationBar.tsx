// NavigationBar.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Drawer, List } from '@mui/material';
import { ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import useAuthState from '../hooks/useAuthState';
import { logoutService } from '../services/auth';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const NavigationBar: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const user = useAuthState();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = async () => {
        handleMenuClose();
        try {
            await logoutService();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const NavLink = ({ to, label, sx }: { to: string; label: string; sx?: any }) => (
        <Button color="inherit" component={Link} to={to} sx={{ color: 'white', fontSize: '18px', fontWeight: 'bold', ...sx }}>
            {label}
        </Button>
    );
    const renderMobileMenu = (
        <Drawer anchor="left" open={mobileMenuOpen} onClose={handleMobileMenuToggle}>
            <List>
                <ListItemButton component={Link} to="/" onClick={handleMobileMenuToggle}>
                    <HomeIcon />
                </ListItemButton>
                <ListItemButton component={Link} to="/organization/list" onClick={handleMobileMenuToggle}>
                    団体
                </ListItemButton>
                <ListItemButton component={Link} to="/rooms/list" onClick={handleMobileMenuToggle}>
                    部屋
                </ListItemButton>
                <ListItemButton component={Link} to="/reservations/list" onClick={handleMobileMenuToggle}>
                    予約
                </ListItemButton>
            </List>
        </Drawer>
    );

    return (
        <AppBar position="static">
            <Toolbar sx={{ minHeight: '40px' }}> {/* ナビゲーションバーの高さを小さくする */}
                {isMobile ? (
                    <>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMobileMenuToggle}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="left" open={mobileMenuOpen} onClose={handleMobileMenuToggle}>
                            <List>
                                <ListItemButton component={Link} to="/" onClick={handleMobileMenuToggle}>
                                    <HomeIcon />
                                </ListItemButton>
                                {renderMobileMenu}
                            </List>
                        </Drawer>
                    </>
                ) : (
                    <>
                        <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
                            <HomeIcon />
                        </IconButton>
                        <NavLink to="/organization/list" label="団体" />
                        <NavLink to="/rooms/list" label="部屋" />
                        <NavLink to="/reservations/list" label="予約" />
                    </>
                )}
                {user ? (
                    <>
                        <Button aria-controls="user-menu" aria-haspopup="true" onClick={handleMenuOpen} sx={{ color: 'white', marginLeft: 'auto', fontSize: '18px', fontWeight: 'bold' }}>
                            {user.displayName || user.email}
                        </Button>
                        <Menu id="user-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem onClick={handleMenuClose}>プロフィール</MenuItem>
                            <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <NavLink to="/login" label="ログイン" sx={{ marginLeft: 'auto' }} />
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;