import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import AdminOptions from './AdminOptions';
import { display } from '@mui/system';
import { useEffect } from 'react';


import { styled } from '@mui/material/styles';

const CustomizeAppBar = styled(AppBar)`
  background-color: var(--green);
`;

const drawerWidth = 240;
const navItems = [
  {
    id: 1,
    name: 'Iniciar sesión',
    link: '/login',
    icon: <LoginOutlinedIcon/>,
  },
  {
    id: 2,
    name: 'Registrarse',
    link: '/signup',
    icon: <AppRegistrationOutlinedIcon/>,
  },
];

const itemsLogin = [
  {
    id: 1,
    name: 'Cerrar sesión',
    link: '/',
    icon: <LogoutOutlinedIcon/>,
  },
]


function DrawerAppBar({children}, props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { user, logout } = useAuth();
 
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link href="/">
          CELTA
        </Link>
      </Typography>
      <Divider />
      <List>
      {!user ? (
        navItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{justifyContent: 'center'}}>
            <Link href={item.link} key={item.id}>
              <Button key={item.id} sx={{ color: '#000' }}>
                {item.name}
              </Button>
            </Link>
          </ListItem>
        ))
        ) : (
          <>
          <AdminOptions type='mobile' />
          <ListItem disablePadding sx={{justifyContent: 'center'}}>
            <Link href="/">
              <Button sx={{ color: '#000' }} onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </Link>
          </ListItem>
          </>
        )
      }
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
     
      <CustomizeAppBar component="nav" color="secondary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link href="/">
                CELTA
            </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {!user ? (
              navItems.map((item) => (
                <Link href={item.link} key={item.id}>
                  <Button key={item.id} sx={{ color: '#fff' }}>
                    {item.name}
                  </Button>
                </Link>
              ))
            ) : (
              <Box sx={{display: 'flex'}}>
                {user.rol === 'admin' && <AdminOptions />}
                <Link href="/">
                  <Button sx={{ color: '#fff', width: '130px' }} onClick={handleLogout}>
                    Cerrar sesión
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </CustomizeAppBar>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx = {{ margin: 'auto' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;