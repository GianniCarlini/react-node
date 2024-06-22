/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost, deletePost } from '../store/postsSlice';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const Input = styled.input`
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

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
    <Container>
      <h2>Posts</h2>
      {postStatus === 'loading' && <div>Loading...</div>}
      {postStatus === 'failed' && <div>{error}</div>}
      <Table>
        <thead>
          <tr>
            <Th>Nombre</Th>
            <Th>Descripción</Th>
            <Th>Acción</Th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <Td>{post.name}</Td>
              <Td>{post.description}</Td>
              <Td>
                <Button onClick={() => handleDeletePost(post.id)}>Eliminar</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <Input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleCreatePost}>Crear</Button>
      </div>
    </Container>
  );
};

export default PostList;
