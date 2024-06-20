import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppAppBar from '../../views/AppAppBar';
import withRoot from '../../withRoot';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import '../../../../App.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import FormButton from '../../form/FormButton';
import RFTextField from '../../form/RFTextField';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(40, 40, 42)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function ProductosAdmin() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Ajusta esto según cómo almacenes el token
  const [productos, setProductos] = useState([]);
  const obtenerProductos = async () => {
    try {
      const response = await fetch('http://localhost:5298/api/Producto/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        // Usuario no autorizado
        console.error('Usuario no autorizado. Redirigiendo al inicio de sesión...');
        navigate('/sign-in/');
        // Aquí puedes redirigir al usuario al inicio de sesión, por ejemplo:
        // window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setProductos(result)


    } catch (response) {

      const result = await response.json();
      console.error('Error:', result.messageError);
      // Puedes manejar el error aquí
    } finally {
      // comprobar();
    }
  };

  const theme = createTheme({
    typography: {
      poster: {
        fontSize: '4rem',
        color: '#69696a',
      },
      // Disable h3 variant
      h3: undefined,
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            // Map the new variant to render a <h1> by default
            poster: 'h1',
          },
        },
      },
    },
  });

  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    obtenerProductos();
  }, [trigger]);


  const [openForm, setOpenForm] = useState(false);

  const handleClickOpenModalForm = () => {
    setOpenForm(true);
  };

  const handleCloseModalForm = () => {
    setOpenForm(false);
  };

  const [errorResponse, setErrorResponse] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  

  const handleSubmitFormModal = async (values, form) => {
    console.log(form)
    if (values.metroslineales === null || values.metroslineales === undefined) {
      values.metroslineales = false
    }
    if (values.metroscuadrados === null || values.metroscuadrados === undefined) {
      values.metroscuadrados = false
    }
    if (values.gramos === null || values.gramos === undefined) {
      values.gramos = false
    }
    if (values.kilogramos === null || values.kilogramos === undefined) {
      values.kilogramos = false
    }
    if (values.toneladas === null || values.toneladas === undefined) {
      values.toneladas = false
    }

    try {
      const response = await fetch('http://localhost:5298/api/Producto/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("resultado de la respuesta ")
      console.log(response)
      console.log("resultado de la adicion de otro producto")
      handleCloseModalForm();
      setTrigger(!trigger);

    } catch (response) {
      
      const result = await response.json();
      console.error('Error:', result.messageError);
    } finally {
      setSent(false);
    }
  }

  const resetForm = () => {
    document.getElementById('campoNombre').value = '';
    document.getElementById('campoValorUnidad').value = '';
    document.getElementById('campoDescripcion').value = '';
    document.getElementById('campoMetrosLineales').checked = false;
    document.getElementById('campoMetroCuadrados').checked = false;
    document.getElementById('campoGramos').checked = false;
    document.getElementById('campoKilogramos').checked = false;
    document.getElementById('campoToneladas').checked = false;
  };

  const [openFormUpload, setOpenFormUpload] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [archivos, setArchivos] = useState([]);
  const GetArchivosPorPorducto = async (idproducto) => {    
    try {
      let url = 'http://localhost:5298/api/ArchivoProducto/GetArchivosPorIdProducto/?idproducto=' + idproducto;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setArchivos(result)

      console.log("respuesta fetch archivos por producto")
      console.log(result)
      console.log(response)
    } catch (response) {

      const result = await response.json();
      console.error('Error:', result.messageError);
      // Puedes manejar el error aquí
    } finally {
      // comprobar();
    }    
  }
  const handleClickOpenModalFormUpload = (product) => {    
    setSelectedProduct(product);
    GetArchivosPorPorducto(product);
    setOpenFormUpload(true);
  };

  const handleCloseModalFormUpload = () => {
    setOpenFormUpload(false);
  };

  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log(file)
  };
  const handleSubmitFormUploadModal = async (values) => {
    if (!file) {
      alert('Por favor, selecciona un archivo primero');
      return;
    }


    const dataSend = new FormData();
    dataSend.append('idproducto', selectedProduct);
    dataSend.append('file', file);
    dataSend.append('descripcion', values.descripcionArchivo);

    try {
      const response = await fetch('http://localhost:5298/api/ArchivoProducto/GuardarArchivo', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          // 'Authorization': `Bearer ${token}`,
        },
        body: dataSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("resultado de la respuesta ")
      const result = await response.json()
      console.log(result)
    } catch (response) {
      
      const result = await response.json();
      console.error('Error:', result.messageError);
    } finally {
      setSent(false);
    }
  }
  return (
    <>
      <Dialog
        fullScreen
        id="form-dialog-upload"
        open={openFormUpload}
        onClose={handleCloseModalFormUpload}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

      >
        <DialogTitle id="alert-dialog-title">
          {"Cargar Archivos del Producto"}
        </DialogTitle>
        <DialogContent>
          <Form
            onSubmit={handleSubmitFormUploadModal}
            subscription={{ submitting: true }}
            
          // validate={validate}
          >
            {({ handleSubmit: handleSubmit2, submitting }) => (
              <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
                <div style={{ display: 'flex', gap: '1rem', width: '80%', margin: '0 auto' }}>
                  <Field
                    id="descripcionArchivo"
                    autoComplete="Descripción"
                    autoFocus
                    component={RFTextField}
                    disabled={submitting || sent}
                    fullWidth
                    label="Descripción"
                    margin="normal"
                    name="descripcionArchivo"
                    required
                    size="medium"
                  />
                  <div style={{width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <input
                      id="file"
                      disabled={submitting || sent}
                      required
                      name="file"
                      type='file'
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                {errorResponse && <Alert variant="filled" severity="error">This is an error Alert.</Alert>}
                <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <FormButton
                  sx={{ margin: '2rem auto', width: '20%' }}
                  disabled={submitting || sent}
                  size="medium"
                  color="secondary"
                >
                  {submitting || sent ? 'En progreso…' : 'Cargar'}
                </FormButton>
                </div>
              </Box>
            )}
          </Form>
          <div className='custom-hr'></div>
          <TableContainer component={Paper} sx={{height: '30vh', marginBottom: '5rem'}}>
          <Table sx={{ width: '50rem', margin: '0 auto'}} aria-label="customized table" size='small' dense="true">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Descripcion</StyledTableCell>
                <StyledTableCell align="right">Fecha Cargue</StyledTableCell>
                <StyledTableCell align="right">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {archivos.map((rowAux) => (
                <StyledTableRow key={rowAux.id}>
                  <StyledTableCell align="right">{rowAux.descripcion}</StyledTableCell>
                  <StyledTableCell align="right">{rowAux.fechacargue}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton aria-label="delete" size="small">
                      <VisibilityOutlinedIcon fontSize="inherit" sx={{ color: '#1499DC' }} />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalFormUpload}>Cancelar</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openForm}
        onClose={handleCloseModalForm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

      >
        <DialogTitle id="alert-dialog-title">
          {"Editar producto"}
        </DialogTitle>
        <DialogContent>
          <Form
            onSubmit={handleSubmitFormModal}
            subscription={{ submitting: true }}
            
          // validate={validate}
          >
            {({ handleSubmit: handleSubmit2, submitting }) => (
              <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Field
                    id="campoNombre"
                    autoComplete="Nombre"
                    autoFocus
                    component={RFTextField}
                    disabled={submitting || sent}
                    fullWidth
                    label="Nombre"
                    margin="normal"
                    name="nombre"
                    required
                    size="medium"
                  />
                  <Field
                    id="campoValorUnidad"
                    fullWidth
                    size="medium"
                    component={RFTextField}
                    disabled={submitting || sent}
                    required
                    name="valorporunidad"
                    autoComplete="Valor por unidad"
                    label="Valor unidad"
                    margin="normal"
                    type='number'
                  />
                </div>
                <Field
                  id="campoDescripcion"
                  fullWidth
                  size="medium"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="descripcion"
                  autoComplete="descripción"
                  label="Descripción"
                  margin="normal"
                  multiline
                />
                <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                  <Typography variant="caption" sx={{fontWeight: 'bold'}}>
                    Unidades
                  </Typography>
                  <div className='custom-hr' style={{width: '90%', borderColor: '#1499DC'}}></div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>                
                  <Field
                    id="campoMetrosLineales"
                    fullWidth
                    size="medium"
                    component={RFTextField}
                    disabled={submitting || sent}
                    required
                    name="esmetroslineales"
                    autoComplete="metros lineales"
                    label="Metros lineales"
                    margin="normal"
                    type='checkbox'
                  />
                  <Field
                    id="campoMetroCuadrados"
                    fullWidth
                    size="medium"
                    component={RFTextField}
                    disabled={submitting || sent}
                    required
                    name="esmetroscuadrados"
                    autoComplete="Metros cuadrados"
                    label="Metros cuadrados"
                    margin="normal"
                    type='checkbox'
                  />
                  <Field
                    id="campoGramos"
                    fullWidth
                    size="medium"
                    component={RFTextField}
                    disabled={submitting || sent}
                    required
                    name="esgramos"
                    autoComplete="gramos"
                    label="Gramos"
                    margin="normal"
                    type='checkbox'
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Field
                    id="campoKilogramos"
                    fullWidth
                    size="medium"
                    component={RFTextField}
                    disabled={submitting || sent}
                    required
                    name="eskilogramos"
                    autoComplete="kilogramos"
                    label="Kilogramos"
                    margin="normal"
                    type='checkbox'
                  />
                  <Field
                    id="campoToneladas"
                    fullWidth
                    size="medium"
                    component={RFTextField}
                    disabled={submitting || sent}
                    required
                    name="estoneladas"
                    autoComplete="toneladas"
                    label="Toneladas"
                    margin="normal"
                    type='checkbox'
                  />
                </div>
                {errorResponse && <Alert variant="filled" severity="error">This is an error Alert.</Alert>}
                <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <FormButton
                  sx={{ margin: '2rem auto', width: '50%' }}
                  disabled={submitting || sent}
                  size="medium"
                  color="secondary"
                >
                  {submitting || sent ? 'En progreso…' : 'Guardar'}
                </FormButton>
                </div>
              </Box>
            )}
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalForm}>Cancelar</Button>
        </DialogActions>
      </Dialog>

      <AppAppBar />
      <div style={{ height: '80vh', width: '90%', margin: '0 auto' }}>
        <ThemeProvider theme={theme}>
          <Typography variant="poster" sx={{ fontSize: '2.5rem' }}>Gestión de productos</Typography>
        </ThemeProvider>
        <div className='custom-hr'></div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
          <Button
            onClick={handleClickOpenModalForm}
            variant="outlined"
            size="small"
            sx={
              {
                border: '2px solid #28282a',
                ':hover': {
                  border: '2px solid #007BFF', // Cambia el color del borde en hover
                  backgroundColor: '#f0f0d1',
                  transform: 'scale(1.03)'  // Cambia el color de fondo en hover
                }
              }
            }>
            <strong>+ P</strong>roducto
          </Button>
        </div>
        <TableContainer component={Paper} sx={{height: '80vh', marginBottom: '5rem'}}>
          <Table sx={{ minWidth: 700}} aria-label="customized table" size='small' dense="true">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="right">Descripcion</StyledTableCell>
                <StyledTableCell align="right">Valor por unidad</StyledTableCell>
                <StyledTableCell align="right">Metros lineales</StyledTableCell>
                <StyledTableCell align="right">Metros cuadrados</StyledTableCell>
                <StyledTableCell align="right">Gramos</StyledTableCell>
                <StyledTableCell align="right">Kilogramos</StyledTableCell>
                <StyledTableCell align="right">Toneladas</StyledTableCell>
                <StyledTableCell align="right">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((rowAux) => (
                <StyledTableRow key={rowAux.id}>
                  <StyledTableCell component="th" scope="row">
                    {rowAux.nombre}
                  </StyledTableCell>
                  <StyledTableCell align="right">{rowAux.descripcion}</StyledTableCell>
                  <StyledTableCell align="right">{rowAux.valorporunidad}</StyledTableCell>
                  <StyledTableCell align="right"><Checkbox sx={{ '&.Mui-checked': { color: '#1499DC' } }} checked={rowAux.esmetroslineales} /></StyledTableCell>
                  <StyledTableCell align="right"><Checkbox sx={{ '&.Mui-checked': { color: '#1499DC' } }} checked={rowAux.esmetroscuadrados} /></StyledTableCell>
                  <StyledTableCell align="right"><Checkbox sx={{ '&.Mui-checked': { color: '#1499DC' } }} checked={rowAux.esgramos} /></StyledTableCell>
                  <StyledTableCell align="right"><Checkbox sx={{ '&.Mui-checked': { color: '#1499DC' } }} checked={rowAux.eskilogramos} /></StyledTableCell>
                  <StyledTableCell align="right"><Checkbox sx={{ '&.Mui-checked': { color: '#1499DC' } }} checked={rowAux.estoneladas} /></StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton onClick={() => GetArchivosPorPorducto(rowAux.id)} aria-label="delete" size="small">
                      <EditIcon fontSize="inherit" sx={{ color: '#1499DC' }} />
                    </IconButton>
                    <IconButton id={rowAux.id} onClick={() => handleClickOpenModalFormUpload(rowAux.id)} aria-label="delete" size="small">
                      <AttachFileIcon fontSize="inherit" sx={{ color: '#1499DC' }} />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default withRoot(ProductosAdmin)