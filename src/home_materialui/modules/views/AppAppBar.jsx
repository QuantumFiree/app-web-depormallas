import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import Logo from '../../../assets/img/Logo-depormallas.png';

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListIcon from '@mui/icons-material/List';

import HouseIcon from '@mui/icons-material/House';
import InventoryIcon from '@mui/icons-material/Inventory';
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  const tokenExpira = localStorage.getItem('tokenExpira');
  const usuarioStorage = localStorage.getItem('usuario');
  const usuario = JSON.parse(usuarioStorage);
  let adminOn = false;

  const dateNow = new Date();
  const dateTokenExpira = new Date(tokenExpira.replace(' ', 'T'));

  if (dateTokenExpira.getTime() < dateNow.getTime()) {
    adminOn = false;
  } else {
    adminOn = true;
  }

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const elementsDrawerListSuperior = [
    {
      text: 'Inicio',
      icon: <HouseIcon />,
      link: '/home-admin',
    },
    {
      text: 'Productos',
      icon: <InventoryIcon />,
      link: '/admin-productos',
    },
    {
      text: 'Servicios',
      icon: <ConstructionIcon />,
      link: '/admin-servicios',
    },
    // {
    //   text: 'Ventas',
    //   icon: <ListIcon />,
    //   link: '/ventas',
    // }
  ];

  const elementsDrawerListInferior = [
    {
      text: 'Información',
      icon: <SettingsIcon />,
      link: '/home-admin',
    },
    {
      text: 'Cerrar sesión',
      icon: <ExitToAppIcon />,
      link: '/admin-productos',
    },
  ];
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {elementsDrawerListSuperior.map((elemento) => (
          <ListItem key={elemento.text} disablePadding>
            <ListItemButton>
              <Link
                underline="none"
                color="inherit"
                href={elemento.link}
                sx={{ display: 'flex' }}
              >
                <ListItemIcon>
                  {elemento.icon}
                </ListItemIcon>

                <ListItemText primary={elemento.text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {elementsDrawerListInferior.map((elemento) => (
          <ListItem key={elemento.text} disablePadding>
            <ListItemButton>
              <Link
                underline="none"
                color="inherit"
                href={elemento.link}
                sx={{ display: 'flex' }}
              >
                <ListItemIcon>
                  {elemento.icon}
                </ListItemIcon>
                <ListItemText primary={elemento.text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: adminOn ? "flex-end" : 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            {!adminOn && <Link
              variant="h6"
              underline="none"
              color="inherit"
              href="/Home/"
              sx={{ fontSize: 24 }}
            >
              <img
                style={{ display: 'block', }}
                width={30}
                height={30}
                src={Logo}
                alt="increase priority"

              />
            </Link>}
            {adminOn && <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button sx={{ color: 'white' }} onClick={toggleDrawer(true)} startIcon={<ListIcon />}>Menú</Button>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
            </Box>}
          </Box>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/Home/"
            sx={{ fontSize: 20, display: 'flex', direction: 'row', justifyContent: 'end', gap: '1rem' }}
          >
            {adminOn && <img
              style={{ display: 'block', }}
              width={30}
              height={30}
              src={Logo}
              alt="increase priority"

            />}
            {'DEPORMALLAS'}
          </Link>
          {!adminOn && <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/sign-in/"
              sx={rightLink}
            >
              {'Entrar'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/sign-up/"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {'Registrar'}
            </Link>
          </Box>}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
