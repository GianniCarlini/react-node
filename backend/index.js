const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config();
const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: 'postgres'
});

const app = express();
const PORT = 3000;

app.use(express.json());

const Post = sequelize.define('Post', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

app.get('/posts', async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  await Post.destroy({ where: { id } });
  res.sendStatus(204);
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
