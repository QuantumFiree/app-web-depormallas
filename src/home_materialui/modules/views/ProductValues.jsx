import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import ImgMallas from '../../../assets/img/Mallas-deportivas.jpg'
import ImgGrama from '../../../assets/img/grama-colores.jpg'
import ImgInstalacion from '../../../assets/img/servicio-instalacion.jpg'

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              {/* <Box
                component="img"
                src="../../../assets/img/Mallas-deportivas.jpg"
                alt="suitcase"
                sx={{ height: 55 }}
              /> */}
              <img
                style={{ display: 'block', borderRadius: '50%' }}
                width={200}
                height={200}
                src={ImgMallas}
                alt="increase priority"

              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Mallas deportivas
              </Typography>
              <Typography variant="h5">
                {
                  'Lorem ipsum dolor sit amet consectetur adipiscing elit blandit pharetra, sociosqu at fames vel tincidunt penatibus a. Nibh commodo turpis pretium lectus faucibus fames, luctus donec aliquam.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <img
                style={{ display: 'block', borderRadius: '50%' }}
                width={200}
                height={200}
                src={ImgGrama}
                alt="increase priority"
              
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Grama sintetica
              </Typography>
              <Typography variant="h5">
                {
                  'Lorem ipsum dolor sit amet consectetur adipiscing elit blandit pharetra, sociosqu at fames vel tincidunt penatibus a. Nibh commodo turpis pretium lectus faucibus fames, luctus donec aliquam.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
            <img
                style={{ display: 'block', borderRadius: '50%' }}
                width={200}
                height={200}
                src={ImgInstalacion}
                alt="increase priority"

              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Servicios de instalación
              </Typography>
              <Typography variant="h5">
                {'Lorem ipsum dolor sit amet consectetur adipiscing elit blandit pharetra, sociosqu at fames vel tincidunt penatibus a. Nibh commodo turpis pretium lectus faucibus fames, luctus donec aliquam.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
