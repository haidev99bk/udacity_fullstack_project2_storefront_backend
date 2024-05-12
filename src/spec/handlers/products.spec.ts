import supertest from "supertest";
import app from "../../app";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
import { UserDB, UserFull } from "../../models/user";

dotEnv.config();

const mockUser: UserFull = {
  firstName: "Test",
  lastName: "endpoint",
  userName: "haidev99bk",
  password: "haidev99bk@12345",
};

const mockProduct = {
  name: "Product1",
  price: 2000,
};

let token = "";
let userId = "";
let productId = "";

const request = supertest(app);

describe("products endpoints", () => {
  beforeAll(async () => {
    const res = await request
      .post("/api/users/create")
      .send(mockUser)
      .expect(200);
    token = res.body;
    let user = jwt.verify(token, process.env.SECRET_KEY as string);

    if (typeof user === "object") {
      userId = (user as UserDB)?.id.toString();
    }
  });

  afterAll(async () => {
    await request
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
  });

  it("products create endpoint", (done) => {
    (async () => {
      const res = await request
        .post("/api/products/create")
        .set("Authorization", `Bearer ${token}`)
        .send(mockProduct)
        .expect(201);

      productId = res.body.id;
      done();
    })();
  });

  it("Get all products endpoint", async () => {
    const res = await request
      .get("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("Get the products endpoint", async () => {
    const res = await request
      .get(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("Update the products endpoint", async () => {
    const res = await request
      .put(`/api/products/${productId}`)
      .send(mockProduct)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("products delete endpoint", async () => {
    const res = await request
      .delete(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
