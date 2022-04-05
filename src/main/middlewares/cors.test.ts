import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    app.post('/test_cors', (req, res) => {
      res.send(req.body)
    })
    await request(app).post('/test_cors').expect('access-control-allow-origin', '*')
    await request(app).post('/test_cors').expect('access-control-allow-methods', '*')
    await request(app).post('/test_cors').expect('access-control-allow-headers', '*')
  })
})