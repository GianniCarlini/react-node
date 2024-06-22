/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost, deletePost } from '../store/postsSlice';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const ClearIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-left: 10px;

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
  const [filter, setFilter] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

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

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterPosts = () => {
    setFilteredPosts(posts.filter(post =>
      post.name.toLowerCase().includes(filter.toLowerCase())
    ));
  };

  const handleClearFilter = () => {
    setFilter('');
    setFilteredPosts(posts);
  };

  return (
    <Container>
      <h2>Posts</h2>
      {postStatus === 'loading' && <div>Loading...</div>}
      {postStatus === 'failed' && <div>{error}</div>}
      
      <InputContainer>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Filtro de Nombre"
            value={filter}
            onChange={handleFilterChange}
          />
          {filter && <ClearIcon icon={faTimes} onClick={handleClearFilter} />}
        </InputWrapper>
        <Button onClick={handleFilterPosts}>Buscar</Button>
      </InputContainer>

      {Array.isArray(filteredPosts) && (
        <Table>
          <thead>
            <tr>
              <Th>Nombre</Th>
              <Th>Descripción</Th>
              <Th>Acción</Th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map(post => (
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
      )}
      <InputContainer style={{gap: '5px'}}>
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
      </InputContainer>
    </Container>
  );
};

export default PostList;
