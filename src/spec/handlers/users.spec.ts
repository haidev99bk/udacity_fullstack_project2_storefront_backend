import supertest from 'supertest'
import app from '../../app'
import { UserDB, UserFull } from '../../models/user'
import jwt from 'jsonwebtoken'
import dotEnv from 'dotenv'

dotEnv.config()

const mockUser: UserFull = {
  firstName: 'Test',
  lastName: 'endpoint',
  userName: 'haidev99bk',
  password: 'haidev99bk@12345',
}

let token = ''
let userId = ''

const request = supertest(app)

describe('User endpoints', () => {
  it('User create endpoint', (done) => {
    ;(async () => {
      const res = await request
        .post('/api/users/create')
        .send(mockUser)
        .expect(200)

      token = res.body
      const user = jwt.verify(token, process.env.SECRET_KEY as string)

      if (typeof user === 'object') {
        userId = (user as UserDB)?.id.toString()
      }

      done()
    })()
  })

  it('Get all users endpoint', async () => {
    await request
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })

  it('Get the user endpoint', async () => {
    await request
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })

  it('Update the user endpoint', async () => {
    await request
      .put(`/api/users/${userId}`)
      .send(mockUser)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })

  it('User delete endpoint', async () => {
    await request
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })
})
