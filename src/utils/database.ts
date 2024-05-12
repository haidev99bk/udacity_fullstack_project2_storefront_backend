import { Pool } from 'pg'
import dotEnv from 'dotenv'

dotEnv.config()

const { PG_HOST, PG_DEV_DB, PG_TEST_DB, PG_USER, PG_PASSWORD, ENV } =
  process.env

const pool = new Pool({
  host: PG_HOST,
  database: ENV === 'test' ? PG_TEST_DB : PG_DEV_DB,
  user: PG_USER,

  password: PG_PASSWORD,
})

export default pool
