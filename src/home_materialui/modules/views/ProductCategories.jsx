import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import ImgMallaProducto from '../../../assets/img/malla-producto.jpg'
import ImgGramaProducto from '../../../assets/img/grama-producto2.jpg'
import ImgHiloProducto from '../../../assets/img/hilo-producto.jpg'
import ImgCauchoProducto from '../../../assets/img/caucho-producto.jpg'
import ImgArenaProducto from '../../../assets/img/arena-producto.jpg'
import ImgImplementacionProducto from '../../../assets/img/implementos-deportivos-producto.jpg'
import ImgInstalacionGramaProducto from '../../../assets/img/instalacion-grama-producto.jpg'

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    src: ImgMallaProducto,
    title: 'Mallas',
    width: '40%',
  },
  {
    src: ImgHiloProducto,
    title: 'Hilos',
    width: '20%',
  },
  {
    src: ImgGramaProducto,
    title: 'Grama',
    width: '40%',
  },
  {
    src: ImgCauchoProducto,
    title: 'Caucho',
    width: '38%',
  },
  {
    src: ImgArenaProducto,
    title: 'Arena',
    width: '38%',
  },
  {
    src: ImgImplementacionProducto,
    title: 'Implementaciones',
    width: '24%',
  },
  {
    src: ImgInstalacionGramaProducto,
    title: 'Instalación Grama',
    width: '40%',
  },
  {
    src: '',
    title: 'Instalación Mallas',
    width: '20%',
  },
];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Todos nuestros productos y servicios
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.src})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
