import { Button, CircularProgress, Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { selectPostsLoading } from '../features/posts/postsSelectors';
import { addPost } from '../features/posts/postsSlice';

export default function PostForm({ onFinish }) {
  const [postTitle, setPostTitle] = useState('');
  const [postUserId, setPostUserId] = useState('');
  const [postBody, setPostBody] = useState('');
  const isLoading = useSelector(selectPostsLoading);
  const dispatch = useDispatch();

  const handleChangeTitle = (event) => {
    setPostTitle(event.target.value);
  };

  const handleChangeUserId = (event) => {
    let input = event.target.value;
    if (
      !input ||
      (input[input.length - 1].match('[0-9]') && input[0].match('[1-9]'))
    )
      setPostUserId(input);
  };

  const handleChangeBody = (event) => {
    setPostBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addPost({
        userId: parseInt(postUserId, 10),
        title: postTitle,
        body: postBody,
      })
    );
    onFinish(false);
  };

  const isValidSubmit = () => {
    return postTitle?.length && postBody?.length && postUserId;
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        marginTop: '70px',
      }}
    >
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        style={{ display: 'flex', flexDirection: 'column' }}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id='outlined-id'
          label='UserID'
          placeholder='UserID'
          value={postUserId}
          type='number'
          onChange={handleChangeUserId}
        />
        <TextField
          required
          id='outlined-title'
          label='Title'
          placeholder='Title'
          value={postTitle}
          onChange={handleChangeTitle}
        />
        <TextField
          required
          id='outlined-body'
          label='Body'
          placeholder='Body'
          value={postBody}
          onChange={handleChangeBody}
        />
        <Button
          sx={{ mt: 4 }}
          type='submit'
          disabled={!isValidSubmit()}
          variant='outlined'
          color='success'
        >
          {isLoading ? <CircularProgress size='1.5rem' /> : 'Submit'}
        </Button>
      </Box>
    </div>
  );
}
