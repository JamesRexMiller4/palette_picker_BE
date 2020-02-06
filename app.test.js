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

  describe('POST /api/v1/folders', () => {
    it('should responde with 201 after posting a new folder', async () => {
      const newFolder = {folder_name: 'Colors to Save the World'};

      const res = await request(app).post('/api/v1/folders').send(newFolder);

      const folders = await database('folders').where('id', res.body.id[0]);

      const folder = folders[0];

      expect(res.status).toBe(201);
      expect(folder.folder_name).toEqual(newFolder.folder_name)
    })
  })
});

