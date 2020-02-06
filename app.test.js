import "@babel/polyfill";
import request from 'supertest'
import app from './app'

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

beforeEach(async () => {
  await database.seed.run()
})

describe('App', () => {
  describe('init', () => {
    it('should return a 200 status', async () => {
      const res = await request(app).get('/')
      expect(res.status).toBe(200)
    });
  })

  describe('GET /api/v1/folders', async () => {
    it('should return a 200 status and all folders', async () => {
      const expectedFolders = await database('folders')
        .select();

      const response = await request(app)
        .get('/api/v1/folders');

      const folders = response.body;

      expect(response.status).toBe(200);
      expect(folders).toEqual(expectedFolders);
    });

    it('should return a 404 status if it can not find matching folders', async ()=> {
      await database('palettes').del();
      await database('folders').del();

      const response = await request(app)
        .get('/api/v1/folders');

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('No folders found')
    });
  });

  describe('GET "/api/v1/folders/:folderId"', () => {
    it('should return a 200 status code and a single folder resource', async () => {
      const expectedFolder = await database('folders').first();
      const { id } = expectedFolder;

      const res = await request(app).get(`/api/v1/folders/${id}`);
      const result = res.body[0];

      expect(res.status).toBe(200);
      expect(result).toEqual(expectedFolder[0]);
    });
    it('should return a 404 status code and error message', async () => {
      const sadID = -42;

      const res = await request(app).get(`/api/v1/folders/${sadID}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toEqual('Folder not found');
    });
  });

  describe('GET "api/v1/folders/:folderId/palettes/:paletteId', () => {
    it('should return a 200 status code and a single palette resource', async () => {
      const expectedPalette = await database('palettes').first();
      const { id } = expectedPalette;

      const res = await request(app).get(`/api/v1/folders/1/palettes/${id}`);
      const result = res.body[0];

      expect(res.status).toBe(200);
      expect(result).toEqual(expectedPalette[0]);
    });

    it('should return a 404 status code and error message', async () => {
      const sadID = -42;

      const res = await request(app).get(`/api/v1/folders/1/palettes/${sadID}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toEqual('Palette not found');
    })
  })

  describe('GET /api/v1/folders/:folderId/palettes', () => {
    it('should return a 200 status code and all the palettes for a folder', async () => {
     
      const expectedFolders = await database('folders')
        .select();
      
      const folderId = expectedFolders[0].id;
      
      const expectedPalettes = await database('palettes')
        .where('folder_id', folderId)
        .select();
      
      const response = await request(app)
        .get(`/api/v1/folders/${folderId}/palettes`);

      const palettes = response.body;
      
      expect(response.status).toBe(200);
      expect(palettes).toEqual(expectedPalettes)
  });

  it('should return a 404 status and error if no matching palettes', async () => {
    const invalidFolderId = -10;

    const response = await request(app)
      .get(`/api/v1/folders/${invalidFolderId}/palettes`);
    
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual(`No palettes found for folder ${invalidFolderId}`)
    });
  });

  describe('PATCH /api/v1/folders/:folderId/palettes/:paletteId', () => {
    it('should return a 200 status code, and the modified palette', async () => {
      const folder = await database('folders').first();
      const folderId = folder.id;

      const palette = await database('palettes')
        .where('folder_id', folderId)
        .select();
      const paletteId = palette.id;
      const newPalette = {
        palette_name: 'colors that depress my parents',
        color_one: 'red',
        color_two: 'blue',
        color_three: 'yellow',
        color_four: 'green',
        color_five: 'purple',
        folder_id: folder.id
      };

      const res = await request(app)
        .patch(`/api/v1/folders/${folderId}/palettes/${palettId}`);

      expect(res.status).toBe(200);
      expect(res.body.palette_name).toEqual(newPalette.palette_name)
    })
  })
});

  describe('POST /api/v1/folders', () => {
    it('should respond with 201 after posting a new folder', async () => {
      const newFolder = {folder_name: 'Colors to Save the World'};

      const res = await request(app).post('/api/v1/folders').send(newFolder);

      const folders = await database('folders').where('id', res.body.id);

      const folder = folders[0];

      expect(res.status).toBe(201);
      expect(folder.folder_name).toEqual(newFolder.folder_name)
    });
  });

  describe('POST "/api/v1/folders/:folderId/palettes"', () => {
    it('should return a 201 status code and the newly created palette', async () => {
      const folder = await database('folders').first()
      const folderId = folder.id
      const newPalette = { paletteName: 'Test Palette #1', colors: ['#80e56a', '#51c5c5', '#51ed3d', '#7f6851', '#826fb0']};

      const res = await request(app).post(`/api/v1/folders/${folderId}/palettes`).send(newPalette);
      
      const palettes = await database('palettes').select().where('id', res.body.id);
      const palette = palettes[0];

      expect(res.status).toBe(201);
      expect(palette.palette_name).toEqual(newPalette.paletteName);
    });

    it('should return a 422 status code and an error message informing missing parameters', async () => {
      const folder = await database('folders').first();
      const folderId = folder.id;
      const errorPalette = { paletteName: 'There is a snake in my boot' };

      const res = await request(app).post(`/api/v1/folders/${folderId}/palettes`).send(errorPalette);

      expect(res.status).toBe(422);
      expect(JSON.parse(res.text)).toEqual({ error: `Expected format: { paletteName: <String>, colors: <Array of Strings>}. You're missing a "colors" property.` })
    });
  });
  describe('PATCH "/api/v1/folders/:folderId', () => {
    it('should return a status code 200 and the updated folders name', async () => {
      const folder = await database('folders').first();
      const folderId = folder.id;

      const patchFolder = { folderName: 'New Palette Name' };

      const res = await request(app).patch(`/api/v1/folders/${folderId}`).send(patchFolder);

      
      expect(res.status).toBe(200);
      expect(res.body).toEqual(patchFolder);
    });
    it('should return a status code 422 and an error message informing missing parameters', async () => {
      const folder = await database('folders').first();
      const folderId = folder.id;

      const patchError = { whoops: 'This wont work' };

      const res = await request(app).patch(`/api/v1/folders/${folderId}`).send(patchError);

      expect(res.status).toBe(422);
      expect(JSON.parse(res.text)).toEqual({ error: 'Expected format: {folderName: <String>}' });
    });
  });
  describe('DELETE "/api/v1/folders/:folderId', () => {
    it('should return a status code 200 and message that folder has been deleted', async () => {
      const folder = await database('folders').first();
      const folderId = folder.id;

      const res = await request(app).delete(`/api/v1/folders/${folderId}`)

      expect(res.status).toBe(200);
      expect(res.text).toEqual('Folder has been deleted');
    });
  });
  describe('DELETE "/api/v1/folders/:folderId/palettes/:paletteId', () => {
    it('should return a status code 200 and message that palette has been deleted', async () => {
      const palette = await database('palettes').first();
      const paletteId = palette.id;
      const folderId = palette.folder_id

      const res = await request(app).delete(`/api/v1/folders/${folderId}/palettes/${paletteId}`)

      expect(res.status).toBe(200);
      expect(res.text).toEqual('Palette has been deleted');
    });
  });
  describe('GET CUSTOM ENDPOINT "/api/v1/palettes?', () => {
    it('request should have a search query embedded in its url', async () => {
      const folder = await database('folders').first();
      const folderId = folder.id;

      await database('palettes').insert({
        palette_name: 'Wubbalubbadubdub',
        color_one: '#FFFFFF',
        color_two: '#FFFFFF',
        color_three: '#FFFFFF',
        color_four: '#FFFFFF',
        color_five: '#FFFFFF',
        folder_id: folderId
      })

      const palette = await database('palettes').where('palette_name', 'Wubbalubbadubdub');
      
      const res = await request(app).get(`/api/v1/palettes?palette_name=${palette[0].palette_name}`)

      expect(res.status).toBe(200);
      expect(res.body).toEqual(palette[0]);
    });
    it('should return a status code 404 and message, when no resource is found', async () => {
      const res = await request(app).get(`/api/v1/palettes?palette_name="No Palettes Here"`);

      expect(res.status).toBe(404);
      expect(res.text).toEqual('No results match that query');
    });
  });
});
