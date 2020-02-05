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

app.get('/api/v1/users/:id/folders/:folderId', async (req, res) => {
  const { folderId } = req.params;
  try {
    const folder = await database('folders').select().where("id", folderId);
    folder.length > 0 ? res.status(200).json(folder[0]) : res.status(404).json({error: 'Folder not found'});
  } catch(error) {
    res.status(500).send({ error });
  }
});

app.get('/api/v1/users/:id/folders/:folderId/palettes', async (request, response) => {
  const { folderId } = request.params;
  try {
    const palettes = await database('palettes')
      .where('folder_id', folderId);
    
    if (!palettes.length) {
      return response.status(404)
        .json({error: `No palettes found for folder ${folderId}`})
    } else {
      response.status(200).json(palettes)
    }
    
  } catch (error) {
    response.status(500).json({error})
  }
})

app.get('/api/v1/users/:id/folders/:folderId/palettes/:paletteId', async (req, res) => {
  const { paletteId } = req.params;
  try {
    const palette = await database('palettes').select().where("id", paletteId);
    palette.length > 0 ? res.status(200).json(palette[0]) : res.status(404).json({error: 'Palette not found'});
  } catch(error) {
    res.status(500).send({ error });
  }
})

module.exports = app;