import { Request, Response } from 'express'
import { ProductsStore } from '../models/products'

const productsStore = new ProductsStore()

const getAll = async (req: Request, res: Response) => {
  try {
    const products = await productsStore.getAll()

    res.status(200).json(products)
  } catch (err) {
    res.status(400).json(err)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    if (!req.body.name || !req.body.price) {
      res.status(400).json("Pls provide product's name and price")
    }

    const product = await productsStore.create(req.body.name, req.body.price)

    res.status(201).json(product)
  } catch (err) {
    res.status(400).json(err)
  }
}

const get = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number

    if (!id) {
      res.status(400)
      res.send('Pls provide id')
      return
    }

    const product = await productsStore.get(id)
    res.json(product)
  } catch (err) {
    res.status(400).json(err)
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number
    const name = req.body.name as unknown as string
    const price = req.body.price as unknown as number

    if (!name || !price || !id) {
      res.status(400)
      res.send('Pls provide both id, name and price')
      return
    }
    const product = await productsStore.update(id, {
      name,
      price,
    })

    if (product) {
      res.json(product)
    } else {
      res.status(400).json(`Cannot find product with id: ${id}`)
    }
  } catch (err) {
    res.status(400).json(err)
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number

    if (!id) {
      res.status(400)
      res.send('Pls provide id')
      return
    }

    await productsStore.deleteProduct(id)

    res.send(`Deleted product successfully`)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const productsHandler = {
  getAll,
  create,
  get,

  update,
  deleteProduct,
}

export default productsHandler
