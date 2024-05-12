import express from 'express'
import bodyParser from 'body-parser'
import apiRoutes from './routes/api'

const app = express()

const port = 3000

// middleware
app.use(bodyParser.json())
app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`)
})

export default app
