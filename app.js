import express from 'express';
import cors from 'cors';
const app = express();

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.locals.title = 'Palette Picker API';
app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Welcome to the Palette Picker API');
});

app.get('/api/v1/users/:id/folders/:id', async (req, res) => {
  const { id } = req.params
  try {
    const folder = await database('folders').select().where("id", id);
    folder.length > 0 ? res.status(200).json(folder) : res.status(404).json({error: 'Folder not found'});
  } catch(error) {
    res.status(500).send({ error });
  }
});

module.exports = app;