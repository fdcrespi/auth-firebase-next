import { Alert, Box, Button, Grid, TextField, Typography, Link } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';



export default function Home() {

  const [message, setMessage] = useState('');

  const { user, signup } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { email, password, password2 } = e.target.elements;
    if (password.value !== password2.value) {
      setMessage('Las contraseñas no coinciden');
      return;
    } else {
      setMessage('');
      try {
        if (email.value && password.value) {
          await signup(email.value, password.value);
          router.push("/");
        } else {
          setMessage('Por favor, rellena todos los campos');
        }
      } catch (error) {
        setMessage('El Email ya está registrado o es invalido');
      }
    }
  }

  const inputClick = () => {
    setMessage('');
  }

  return (
    <>
      <main>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& > :not(style)': { m: 1, minWidth: 300},
            alignItems: 'center',
            marginTop: 2,
          }}
          validate = "true"
          autoComplete="off"
        >
          <Typography component="h1" variant="h5" 
            sx={{
              textAlign: 'center',
            }}
          >
            Registro de usuario
          </Typography>
          <TextField
            required
            id="email"
            name='email'
            label="Email"
            type="text"
            fullWidth
            onFocus={inputClick}
          />
          <TextField
            required
            id="password"
            name='password'
            label="Contraseña"
            type="password"
            fullWidth
            onFocus={inputClick}

          />
          <TextField
            required
            id="password2"
            name='password2'
            label="Repetir contraseña"
            type="password"
            fullWidth
            onFocus={inputClick}
          />
          {message && <Alert severity="error">{message}</Alert>}
          <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarme
          </Button>
          <Grid container sx={{justifyContent: 'center'}}>
            <Grid item sx={{mt: 1}}>
              <Link href="/login" variant="body2">
                Ya tengo una cuenta
              </Link>
            </Grid>
          </Grid>
        </Box>
  
      </main>
    </>
  )
}
