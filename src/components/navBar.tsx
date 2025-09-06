import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

export default function NavBar() {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Lowe Notes
                </Typography>
            </Toolbar>
        </AppBar>
    );
};