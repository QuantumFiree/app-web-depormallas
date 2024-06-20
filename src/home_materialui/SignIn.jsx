import * as React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from './modules/components/Typography';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import withRoot from './modules/withRoot';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [sent, setSent] = React.useState(false);
  const [errorResponse, setErrorResponse] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    let valuesSend = {
      correo: values.email,
      clave: values.password,
    };
    setSent(true);
    try {
      const response = await fetch('http://localhost:5298/api/Autenticacion/Validar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(valuesSend),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log("resultado de la respuesta")
      console.log(result);
      if (result.usuario == null) {
        setErrorResponse(true);
        console.log("Error:")
        console.log(response)
      } else {
        setErrorResponse(false);
        console.log('response:', result);

        localStorage.setItem('token', result.token);
        localStorage.setItem('tokenExpira', result.expira);
        localStorage.setItem('usuario', JSON.stringify(result.usuario));

        console.log("token")
        console.log(result.token)
        // navigate('/home-admin');

      }
      

      // Puedes manejar la respuesta de la API aquí

    } catch (response) {
      
      const result = await response.json();
      console.error('Error:', result.messageError);
      // Puedes manejar el error aquí
    } finally {
      setSent(false);
    }
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h4" gutterBottom marked="center" align="center">
            Iniciar sesión
          </Typography>
          <Typography variant="body2" align="center">
            <Link
              href="/premium-themes/onepirate/sign-up/"
              align="center"
              underline="always"
            >
              Registrate aquí
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          // validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              {errorResponse && <Alert variant="filled" severity="error">This is an error Alert.</Alert>}
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'En progreso…' : 'Entrar'}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/premium-themes/onepirate/forgot-password/">
            ¿Olvidaste la contraseña?
          </Link>
        </Typography>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SignIn);
