import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
dotenv.config()

export const tokenVerifyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: 'Access denied, invalid token' })
  }

  try {
    const decoded = jwt.verify(
      token as string,
      process.env.SECRET_KEY as string
    )
    if (decoded) {
      next()
    }
  } catch (err) {
    res.status(401)

    res.json('Access denied, invalid token')
  }
}
