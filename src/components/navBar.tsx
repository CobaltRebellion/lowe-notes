'use client'
import React from 'react';
import { AppBar, Toolbar, Button, Avatar, Typography } from '@mui/material';
import { useUserContext, googleSignIn, logOut } from '../context/notesContext';

export default function Navbar() {
  const { user } = useUserContext() || {};

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Lowe Notes
        </Typography>
        {user ? (
          <>
            <Avatar alt={user.displayName || ''} src={user.photoURL || ''} />
            <Button color="inherit" onClick={logOut}>Logout</Button>
          </>
        ) : (
          <Button color="inherit" onClick={googleSignIn}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};