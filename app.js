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

app.get('/api/v1/users/:id/folders', async (request, response) => {
  const { id } = request.params

  try {
    const folders = await database('folders')
      .where('user_id', id)
      .select();

    if (!folders.length) {
      return response.status(404)
        .json({error: `No folders found for user ${id}`})
    } else {
      response.status(200).json(folders)
    }
  } catch(error) {
    response.status(500).json({error})
  }

})
module.exports = app;