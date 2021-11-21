import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  CardActions,
} from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import loadingImg from '../assets/loading.jpg';
import { Link } from 'react-router-dom';
import { setSelectedPost, removePost } from '../features/posts/postsSlice';
import { useDispatch } from 'react-redux';

export default function PostCard(props) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { id, title, body, userId } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(function (response) {
        setUser(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleSelectPost = (id) => () => {
    dispatch(setSelectedPost(id));
  };

  const handleDeletePost = (id) => () => {
    dispatch(removePost(id));
  };

  return (
    <div>
      {loading ? (
        <>
          <img src={loadingImg} alt='stressed_monkey' width='150px' />
        </>
      ) : (
        <Card key={id} sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'black' }} aria-label='recipe'>
                {id}
              </Avatar>
            }
            action={
              <Link to={`/dashboard/${id}`}>
                <IconButton
                  onClick={handleSelectPost(id)}
                  aria-label='settings'
                >
                  <ReadMoreIcon />
                </IconButton>
              </Link>
            }
            title={title}
            subheader={user.name}
          />
          <CardContent>
            <Typography variant='body2' color='text.secondary'>
              {body}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label='delete'>
              <DeleteForeverIcon onClick={handleDeletePost(id)} />
            </IconButton>
          </CardActions>
        </Card>
      )}
    </div>
  );
}
