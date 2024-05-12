import supertest from 'supertest'
import app from '../../app'
import jwt from 'jsonwebtoken'
import dotEnv from 'dotenv'
import { UserDB, UserFull } from '../../models/user'

dotEnv.config()

const mockUser: UserFull = {
  firstName: 'Test',
  lastName: 'endpoint',
  userName: 'haidev99bk',
  password: 'haidev99bk@12345',
}

const mockProduct = {
  name: 'Product1',
  price: 2000,
}

let token = ''
let userId = ''
let productId = ''
let orderId = ''

const request = supertest(app)

describe('orders endpoints', () => {
  beforeAll(async () => {
    const res = await request
      .post('/api/users/create')
      .send(mockUser)
      .expect(200)
    token = res.body
    const user = jwt.verify(token, process.env.SECRET_KEY as string)

    if (typeof user === 'object') {
      userId = (user as UserDB)?.id.toString()
    }

    const productRes = await request
      .post('/api/products/create')
      .set('Authorization', `Bearer ${token}`)
      .send(mockProduct)
      .expect(201)

    productId = productRes.body.id
  })

  afterAll(async () => {
    await request
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
    await request
      .delete(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
  })

  it('orders create endpoint', (done) => {
    ;(async () => {
      const res = await request
        .post('/api/orders/create')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: userId,
          orderProducts: [
            {
              product_id: productId,
              quantity: 2,
            },
          ],
        })
        .expect(200)

      orderId = res.body.id
      done()
    })()
  })

  it('Get all orders endpoint', async () => {
    await request
      .get(`/api/orders/current-orders/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })

  it('Get the orders endpoint', async () => {
    await request
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })

  it('Update the order endpoint', async () => {
    await request
      .put(`/api/orders/${orderId}`)
      .send({
        status: true,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })

  it('orders delete endpoint', async () => {
    await request
      .delete(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })
})
