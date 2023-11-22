import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Drawer, List, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import useAuthState from '../hooks/useAuthState';
import { logoutService } from '../services/auth';

const NavigationBar: React.FC = () => {
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

    const renderMenuLink = (to: string, label: React.ReactNode, onClick?: () => void) => (
        <ListItemButton component={Link} to={to} onClick={onClick || (() => { })}>
            {label}
        </ListItemButton>
    );

    const renderMobileMenu = (
        <Drawer anchor="left" open={mobileMenuOpen} onClose={handleMobileMenuToggle}>
            <List>
                {renderMenuLink("/", <HomeIcon />, handleMobileMenuToggle)}
                {renderMenuLink("/rooms/list", "部屋", handleMobileMenuToggle)}
                {user && renderMenuLink("/organization/list","団体",handleMobileMenuToggle)}
                {user && renderMenuLink("/reservation/list","予約",handleMobileMenuToggle)}
            </List>
        </Drawer>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <>
                    <IconButton onClick={handleMobileMenuToggle}><MenuIcon /></IconButton>
                    {renderMobileMenu}
                </>
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
                    <Button color="inherit" component={Link} to="/login" sx={{ marginLeft: 'auto', fontSize: '18px', fontWeight: 'bold' }}>
                        ログイン
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
