import { CssBaseline,Box,Typography,Container,Button } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import {  useHistory, Link } from 'react-router-dom';
import { selectSpecificPost } from '../features/posts/postsSelectors';
import {  useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  loginButton: {
    textDecoration: 'none',
  },
}));

export default function PostView() {
  const history = useHistory();
  const selectedPost = useSelector(selectSpecificPost);

  const handleReturnToDashboard = () => {
    history.push('/dashboard');
  };
  
  const classes = useStyles();
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Container component='main' sx={{ mt: 8 }} maxWidth='sm'>
        <Typography variant='h2' component='h1' gutterBottom>
          {selectedPost.title}
        </Typography>
        <Typography variant='h6' component='h2' gutterBottom sx={{ mb: 8 }}>
          {selectedPost.body}
        </Typography>
        <Link to='/dashboard' className={classes.loginButton}>
                <Button
        style={{ marginTop: '2rem' }}
            color='success'
            variant='outlined'
        onClick={handleReturnToDashboard}
      >
        Return to dashboard
      </Button>
        </Link>
      </Container>
    </Box>
  );
}
