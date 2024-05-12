# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

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

## Data Shapes

#### Product

```sql
CREATE TABLE products (
id SERIAL PRIMARY KEY,
name VARCHAR(250) NOT NULL,
price INTEGER NOT NULL
)
```

#### User

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);
```

#### Orders

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    status BOOLEAN NOT NULL
)
```

#### order_products

```sql
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL
)
```
