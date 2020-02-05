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
  describe('GET "/api/v1/users/:id/folders/:folderId"', () => {
    it('should return a 200 status code and a single folder resource', async () => {
      const expectedFolder = await database('folders').first();
      const { id } = expectedFolder;

      const res = await request(app).get(`/api/v1/users/1/folders/${id}`);
      const result = res.body[0];

      expect(res.status).toBe(200);
      expect(result).toEqual(expectedFolder);
    });
    it('should return a 404 status code and error message', async () => {
      const sadID = -42;

      const res = await request(app).get(`/api/v1/users/1/folders/${sadID}`);
      console.log(res.status)
      expect(res.status).toBe(404);
      expect(res.body.error).toEqual('Folder not found')
    });
  });
})