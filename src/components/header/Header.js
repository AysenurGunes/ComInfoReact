import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {

    const location = useLocation();

    const navButtonStyle = (path) => ({
        mx: 1,
        color: location.pathname === path ? '#fff' : '#bbdefb',
        backgroundColor: location.pathname === path ? '#1976d2' : 'transparent',
        '&:hover': {
            backgroundColor: '#1565c0',
            color: '#fff',
        },
        borderRadius: 2,
        textTransform: 'none',
    });

    return (
        <AppBar position="static" sx={{ backgroundColor: '#0d47a1' }}>
            <Toolbar>

                <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
                    İletişim Rehberi
                </Typography>

                <Box>
                    <Button
                        component={Link}
                        to="/companies"
                        sx={navButtonStyle('/companies')}
                    >
                        Şirketler
                    </Button>
                    <Button
                        component={Link}
                        to="/employees"
                        sx={navButtonStyle('/employees')}
                    >
                        Personeller
                    </Button>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Header;