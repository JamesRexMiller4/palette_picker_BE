const express = require('express');
const cors = require('cors');
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
});

app.post('/api/v1/folders/:folderId/palettes', async (req, res) => {
  let palette = req.body;
  const folderId = req.params.folderId;

  Object.assign(palette, {folder_id: folderId})

  for (let requiredParameter of ['paletteName', 'colors']) {
    if (!palette[requiredParameter]) {
      return res
        .status(422)
        .send({ error: `Expected format: { paletteName: <String>, colors: <Array of Strings>}. You're missing a "${requiredParameter}" property.` });
    }
  }

  try {
    const id = await database('palettes').insert({
      palette_name: palette.paletteName,
      color_one: palette.colors[0],
      color_two: palette.colors[1],
      color_three: palette.colors[2],
      color_four: palette.colors[3],
      color_five: palette.colors[4],
      folder_id: palette.folder_id
    }, 'id');
    
    Object.assign(palette, {id: id[0]})
    res.status(201).json(palette)
  } catch(error) {
    res.status(500).json({ error });
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
});

app.patch('/api/v1/folders/:folderId', async (req, res) => {
  const newFolderName = req.body;
  const folderId = req.params.folderId;

  if (!newFolderName.folderName) {
    return res.status(422)
    .json({ error: 'Expected format: {folderName: <String>}' })
  }

  try {
    await database('folders').where("id", folderId).update("folder_name", newFolderName.folderName)
    return res.status(200).json(newFolderName)
  } catch(error) {
    res.status(500).json({ error })
  }
});

app.delete('/api/v1/folders/:folderId', async (req, res) => {
  const folderId = req.params.folderId

  try {
    await database('palettes').select().where('folder_id', folderId).del();
    await database('folders').select().where('id', folderId).del();
    res.status(200).send('Folder has been deleted');
  } catch(error) {
    res.status(500).json({ error });
  }
});

app.delete('/api/v1/folders/:folderId/palettes/:paletteId', async (req, res) => {
  const paletteId = req.params.paletteId;

  try {
    await database('palettes').select().where('id', paletteId).del();
    res.status(200).send('Palette has been deleted');
  } catch(error) {
    res.status(500).json({ error });
  }
});

app.get('/api/v1/palettes?', async (req, res) => {
  let key = req.url.split('?')[1];
  let query = key.split('=')[1];
  key = key.split('=')[0];

  let palette = await database('palettes').select().where(key, query)
  
  try {
    if (!palette.length > 0) {
      return res.status(404).send('No results match that query')
    }
    palette = palette[0]
    res.status(200).json(palette)
  } catch(error) {
    res.status(500).json({ error });
  }
});
app.patch('/api/v1/folders/:folderId/palettes/:paletteId', async (req, res) => {
  const { paletteId } = req.params;
  const palette = req.body;
  for (let requiredParam of [
    'palette_name', 
    'color_one', 
    'color_two', 
    'color_three', 
    'color_four', 
    'color_five', 
    'folder_id'
  ]) {
    if(!palette[requiredParam]) {
      return res.status(422).send({error: `expected format: {
        palette_name: <string>,
        color_one: <string>,
        color_two: <string>,
        color_three: <string>,
        color_four: <string>,
        color_five: <string>,
        folder_id: <integer>
      }. you're missing a ${requiredParam} property`}) 
    }
  }

  try {
    const matchingPalette = await database('palettes')
      .where('id', paletteId)

    if (!matchingPalette.length) {
      return res.status(404).json({error: `No palette found with id ${paletteId}`})
    } else {
    await database('palettes')
      .where('id', paletteId)
      .update({...palette});
    
    const updatedPalette = await database('palettes')
      .where('id', paletteId)
      .select();

    res.status(200).json(updatedPalette[0])
  }
  } catch(error) {
    res.status(500).json({ error });
  }
})

app.get('/', (req, res) => {
  res.send('Welcome to the Palette Picker API');
});

module.exports = app;