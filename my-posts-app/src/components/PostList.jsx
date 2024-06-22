/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost, deletePost } from '../store/postsSlice';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const handleCreatePost = () => {
    if (name && description) {
      dispatch(createPost({ name, description }));
      setName('');
      setDescription('');
    }
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div>
      <h2>Posts</h2>
      {postStatus === 'loading' && <div>Loading...</div>}
      {postStatus === 'failed' && <div>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.name}</td>
              <td>{post.description}</td>
              <td><button onClick={() => handleDeletePost(post.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleCreatePost}>Crear</button>
      </div>
    </div>
  );
};

export default PostList;
