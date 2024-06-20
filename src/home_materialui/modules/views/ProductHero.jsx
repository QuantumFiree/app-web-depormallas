import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import IMGHeader from '../../../assets/img/grama-producto.jpg';
import '../../../index.css';


const backgroundImage =
  '../';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: {IMGHeader},
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={IMGHeader}
        alt="increase priority"
        
      />
      <Typography style={{ zIndex: '1' }} color="inherit" align="center" variant="h2" marked="center">
        Implementación Deportiva
      </Typography>
      <Typography
        color="warning"
        align="center"
        variant="h5"
        className="typo-middle-header"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Especializados en mallas deportivas y gramas sintéticas.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/sign-up/"
        sx={{ minWidth: 200 }}
      >
        Registrarse
      </Button>
      <Typography style={{ zIndex: '1' }} variant="body2" color="inherit" sx={{ mt: 2 }}>
        Descubre nuestros productos y servicios
      </Typography>
    </ProductHeroLayout>
  );
}
