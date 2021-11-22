import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';
//import { login } from '../features/authentication/authSlice';
//import { selectIsAuthenticated } from '../features/authentication/authSelectors';

const theme = createTheme();

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const dispatch = useDispatch();
  //let isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLoginEmail = (event) => {
    event.preventDefault();

    if (email !== 'example@example.com' || password !== 'password') {
      console.log('hola');
      return;
    }
    localStorage.setItem('authorized', '1');
    history.push('/dashboard');
    history.go(0);
  };

  /*  dispatch(
      login({
        email: email,
        password: password,
      })
    );
  };

  if (isAuthenticated) {
    //history.go('/dashboard');
    //history.go(0);
  }
*/
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const isValidLogin = () => {
    return email?.length && password?.length;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'black' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleLoginEmail}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              value={email}
              onChange={handleEmailChange}
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              value={password}
              onChange={handlePasswordChange}
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              disabled={!isValidLogin()}
              variant='outlined'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
