/* eslint-disable */
import React from 'react';
import PostList from './components/PostList';
import styled from 'styled-components';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 20px;
`;

const App = () => {
  return (
    <AppContainer>
      <PostList />
    </AppContainer>
  );
};

export default App;
