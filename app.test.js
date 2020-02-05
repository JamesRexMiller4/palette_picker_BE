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

  describe('GET /api/v1/users/:id/folders', async () => {
    it('should return a 200 status and all folders', async () => {
      const userId = 40
      const expectedFolders = await database('folders')
        .where('id', userId)
        .select();

      const response = await request(app).get(`/api/v1/users/${userId}/folders`);

      const folders = response.body

      expect(response.status).toBe(200);
      expect(folders).toEqual(expectedFolders)
    })
  })
})