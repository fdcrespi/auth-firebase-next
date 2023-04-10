import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, FormControl, FormHelperText, Input, InputLabel, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAuth } from '../context/AuthContext';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [email, setEmail] = React.useState('');

  const { forgotPassword } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitPass = async (event) => {
    event.preventDefault();
    if (!email) {
      setMessage('Por favor, introduce tu email');
    } else {
      await forgotPassword(email);
      alert('Se ha enviado un email a tu cuenta');
    }
    handleClose();
  }

  const inputChange = (event) => {
    setEmail(event.target.value);
  }

  const inputClick = (event) => {
    event.preventDefault();
    event.target.value = '';
    setEmail('');
    setMessage('');
  }


  return (
    <Box sx={{m: 0, textAlign: 'center'}}>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Link href="#" variant="body2" onClick={handleClickOpen} >
        ¿Olvidaste tu contraseña?
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Recuperar contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para restablecer si contraseña, introduce tu email.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={inputChange}
            onClick={inputClick}
          />
          {message && <Alert severity="error">{message}</Alert>}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmitPass}>Restablecer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}