import { OrdersStore } from '../../models/orders'
import { ProductsStore } from '../../models/products'
import { UserFull, UserStore } from '../../models/user'

const userStore = new UserStore()

const orderStore = new OrdersStore()
const productStore = new ProductsStore()

const mockUser: UserFull = {
  firstName: 'Viet',
  lastName: 'Hai',
  userName: 'haidev99bk',
  password: 'haidev99bk@12345',
}

const mockProduct = {
  name: 'Product1',
  price: 2000,
}

let userId = 0
let productId = ''

describe('Orders model', () => {
  beforeAll(async () => {
    const user = await userStore.create(mockUser)
    const product = await productStore.create(
      mockProduct.name,
      mockProduct.price
    )

    userId = user.id
    productId = product.id
  })

  afterAll(async () => {
    await userStore.deleteUserById(userId.toString())
    await productStore.deleteProduct(Number(productId))
  })

  it('should create a new order', async () => {
    const userList = await userStore.getAll()
    const productList = await productStore.getAll()

    const result = await orderStore.create(userList[0].id.toString(), [
      {
        product_id: productList[0].id.toString(),
        quantity: 20,
      },
    ])

    expect((result as any).status).toBeDefined()
  })

  it('should get the order', async () => {
    const orders = await orderStore.getAll()
    const result = await orderStore.getById(orders[0].id)

    expect((result as any).status).toBeDefined()
  })

  it('should get the order by user id', async () => {
    const userList = await userStore.getAll()

    const result = await orderStore.getOrdersByUserId(userList[0].id.toString())

    expect((result as any).length).toEqual(1)
  })

  it('should update the order', async () => {
    const orders = await orderStore.getAll()

    const result = await orderStore.updateOrder(orders[0].id, true)

    expect((result as any).status).toBe(true)
  })

  it('should get all orders', async () => {
    const result = await orderStore.getAll()

    expect((result as any).length).toBe(1)
  })

  it('should add more products all orders', async () => {
    const orders = await orderStore.getAll()
    const productList = await productStore.getAll()

    const result = await orderStore.addMoreProduct(
      orders[0].id,
      productList[0].id.toString(),
      2
    )

    expect((result as any)?.quantity).toBe(2)
  })

  it('should delete order', async () => {
    let orders = await orderStore.getAll()

    await orderStore.deleteOrder(orders[0].id)
    orders = await orderStore.getAll()

    expect((orders as any)?.length).toBe(0)
  })
})
