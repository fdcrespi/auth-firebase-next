import styles from '@/styles/Home.module.css'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { useEffect, useState } from 'react'
import Link from '@mui/material/Link'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'
import FormDialog from '../../components/ForgotPass'
import { CircularProgress } from '@mui/material'

export default function Home() {

  const [message, setMessage] = useState('');

  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  },[user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //console.log(data.get('email'));
    if (data.get('email') && data.get('password')) {
      try {
        await login(data.get('email'), data.get('password'));
        router.push("/");
      } catch (error) {
        console.log(error);
        setMessage('El Email o la contraseña son incorrectos');
      }
    } else {
      setMessage('Por favor, rellena todos los campos');
    }
    
  };

  const inputClick = () => {
    setMessage('');
  }

  return (
    <>
      <main className={styles.main}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& > :not(style)': { m: 1, minWidth: 300},
            alignItems: 'center',
          }}
          validate = "true"
          autoComplete="off"
        >
          <Typography component="h1" variant="h5" 
            sx={{
              textAlign: 'center',
            }}
          >
            Iniciar sesión
          </Typography>
          <TextField
            required
            id="email"
            name='email'
            label="Email"
            type="text"
            onFocus={inputClick}
            fullWidth
          />
          <TextField
            required
            id="password"
            name='password'
            label="Contraseña"
            type="password"
            onFocus={inputClick}
            fullWidth
            autoComplete="current-password"
          />
          {message && <Alert severity="error">{message}</Alert>}
          <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
          </Button>
      
          
            <FormDialog />
            {/* <Link href="#" variant="body2">
              ¿Olvidaste tu contraseña?
            </Link> */}       
            <Link href="/signup" variant="body2" sx={{ textAlign: 'center' }}>
              ¿No tienes una cuenta? Regístrate
            </Link>
            
        
        </Box>

        <Box
          component="button"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& > :not(style)': { m: 1, minWidth: 300},
            alignItems: 'center',
            border: 'none',
            backgroundColor: 'transparent',
            marginTop: 2,
          }}

        >
          <Typography component="h1" variant="h6">
            Pagar factura con DNI / CUIT
          </Typography>
          <Button
              href='https://cajeroenlinea.celtatsas.com.ar'
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Pagar facturas
          </Button>
        </Box>
        
      </main>
    </>
  )
}
