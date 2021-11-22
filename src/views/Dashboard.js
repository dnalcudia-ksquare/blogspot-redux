import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Grid,
  Box,
  Button,
  Typography,
  Container,
  AlertTitle,
  Alert,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { getPosts } from '../features/posts/postsThunks';
import {
  selectPosts,
  selectPostsLoading,
  selectPostsError,
} from '../features/posts/postsSelectors';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

const theme = createTheme();

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);
  const dispatch = useDispatch();

  const handleAddAPost = (value) => setShowForm(value);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const refetchPosts = () => {
    dispatch(getPosts());
  };

  if (error) {
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        There was an error fetching the information!
        <div>
          <Button variant='outlined' onClick={refetchPosts}>
            Click to refetch
          </Button>
        </div>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
          }}
        >
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom
            >
              Posts
            </Typography>
            {!showForm && (
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  marginTop: '10px',
                }}
              >
                <Button
                  align='center'
                  onClick={() => handleAddAPost(true)}
                  variant='outlined'
                  color='success'
                >
                  Add a Post
                </Button>
              </div>
            )}
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='md'>
          {showForm ? (
            <PostForm onFinish={handleAddAPost} />
          ) : (
            <Grid container spacing={4}>
              {posts.map((post) => (
                <Grid item key={post.id} xs={12} sm={6} md={4}>
                  <PostCard
                    id={post.id}
                    title={post.title}
                    body={post.body}
                    userId={post.userId}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </main>
    </ThemeProvider>
  );
}
