import express from 'express';
import cors from 'cors';
const app = express();

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.locals.title = 'Palette Picker API';
app.use(cors());
app.use(express.json());

app.get('/api/v1/folders', async (req, res) => {
  try {
    const folders = await database('folders')
    .select();
    
    if (!folders.length) {
      return res.status(404)
      .json({error: 'No folders found'})
    } else {
      res.status(200).json(folders)
    }
  } catch(error) {
    res.status(500).json({ error })
  }
  
})

app.get('/api/v1/folders/:folderId', async (req, res) => {
  const { folderId } = req.params;
  try {
    const folder = await database('folders').select().where("id", folderId);
    folder.length > 0 ? res.status(200).json(folder[0]) : res.status(404).json({error: 'Folder not found'});
  } catch(error) {
    res.status(500).send({ error });
  }
});

app.get('/api/v1/folders/:folderId/palettes', async (req, res) => {
  const { folderId } = req.params;
  try {
    const palettes = await database('palettes')
    .where('folder_id', folderId);
    
    if (!palettes.length) {
      return res.status(404)
      .json({error: `No palettes found for folder ${folderId}`})
    } else {
      res.status(200).json(palettes)
    }
    
  } catch (error) {
    res.status(500).json({ error })
  }
})

app.get('/api/v1/folders/:folderId/palettes/:paletteId', async (req, res) => {
  const { paletteId } = req.params;
  try {
    const palette = await database('palettes').select().where("id", paletteId);
    palette.length > 0 ? res.status(200).json(palette[0]) : res.status(404).json({error: 'Palette not found'});
  } catch(error) {
    res.status(500).send({ error });
  }
})

app.post('/api/v1/folders', async (req, res) => {
  const newFolder = req.body;

  if (!newFolder.folder_name) {
    return res.status(422)
    .json({error: 'Expected format: {folder_name: <string>}'})
  } 

  try {
    const id = await database('folders').insert(newFolder, 'id')
    res.status(201).json({ id: id[0] })
  } catch(error) {
    res.status(500).json({ error })
  }
})

app.get('/', (req, res) => {
  res.send('Welcome to the Palette Picker API');
});

module.exports = app;