import * as React from 'react';
import Box from '@mui/material/Box';
import AppAppBar from '../../views/AppAppBar';
import withRoot from '../../withRoot';
import Typography from '../Typography';

function HomeAdmin() {
  const usuarioStorage = localStorage.getItem('usuario');
  const usuario = JSON.parse(usuarioStorage);
  return (
    <>
        <AppAppBar admin={true}/>
        
        <Box sx={{ flexGrow: 1 }}>
          <h1>¡Bienvenido <span style={{color: '#1499DC'}}>{usuario.nombres.toUpperCase()}</span>!</h1>
        </Box>
    </>
  );
}

export default withRoot(HomeAdmin);
