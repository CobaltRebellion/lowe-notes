'use client'
import React, { useState, useEffect } from 'react';

import { TextField, Button, styled, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSaveUserNotesContext, useUserContext } from '../context/notesContext';

export default function NoteBlock() {
  const { user, userNotes } = useUserContext() || {};
  const saveUserNotes = useSaveUserNotesContext();
  const [editMode, setEditMode] = useState(false);
  const [notes, setNotes] = useState({
    noteTitle: '',
    noteContent: '',
  });

  useEffect(() => {
    if (userNotes) {
      setNotes(userNotes);
    }
  }, [userNotes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes({
      ...notes,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (saveUserNotes != null) {
      saveUserNotes(notes);
      setEditMode(false);
  }
  };

  const handleCancel = () => {
    if (userNotes) {
      setNotes(userNotes);
    }
    setEditMode(false);
  };

  // these lines handle opening and closing the dialogue
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
  };

  if (!user) {
    return (
      <div>
        <Typography variant="h6">You need to log in</Typography>
      </div>
    );
  }

  // actual things being displayed
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open {notes.noteTitle}
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {editMode ? (
            <>
            <TextField sx={{ m: 1, width: '30ch' }} name="noteTitle" value={notes.noteTitle} onChange={handleChange} />
            </>
          ) : (
            <>
            <Typography sx={{ m: 1, width: '50ch' }}>{notes.noteTitle}</Typography>
            </>
          )}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {editMode ? (
            <>
            <TextField multiline minRows={4} sx={{ m: 1, width: '55ch' }} name="noteContent" value={notes.noteContent} onChange={handleChange} />
            </>
          ) : (
            <>
            <Typography sx={{ m: 1, width: '50ch' }}>{notes.noteContent}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {editMode ? (
            <>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
            </>
          ): (
            <>
            <Button onClick={() => setEditMode(true)}>Edit</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}