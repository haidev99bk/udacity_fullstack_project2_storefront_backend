## Guide:

### ENV config:

```
PG_HOST=localhost
PG_PORT=5432
PG_DEV_DB=udacity_dev_db
PG_TEST_DB=udacity_test_db
PG_USER=postgres
PG_PASSWORD=F***t@12345

SECRET_KEY = 12345

BCRYPT_PEPPER = 123
SALT_ROUNDS=10
```

### Install

`npm install`
`npm install -D`
`npm run db-init:dev`
`npm run db-init:test`

### Run

1. Run dev:
   `npm run start`

2. Run test:
   `npm run test`

## API Endpoints

#### Products

- Index (GET `/api/products` )
- Show [token required] (GET `/api/products/:id`)
- Create [token required] (POST `/api/products`)
- Update [token required] (PUT `/api/products/:id`)
- Delete [token required] (DELETE `/api/products/:id`)

#### Users

- Index (GET `/api/users`)
- Authenticate (POST `/api/users/authenticate`)
- Show [token required] (GET `/api/users/:id`)
- Create [token required] (POST `/api/users/create`)
- Update [token required] (PUT `/api/users/:id`)
- Delete [token required] (DELETE `/api/users/:id`)

#### Orders

- Index (GET `/api/orders`)
- Show [token required] (GET `/api/orders/:id`)
- Show by userId [token required] (GET `/api/orders/current-orders/:userId`)
- Create [token required] (POST `/api/orders`)
- Update [token required] (PUT `/api/orders/:id`)
- Delete [token required] (DELETE `/api/orders/:id`)
- Add more [token required] (POST `/api/orders/add-products/:id`)
