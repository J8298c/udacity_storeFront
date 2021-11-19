import jwt from "jsonwebtoken";
import supertest from "supertest";
import app from "../server";

describe("Product Controller", () => {
  const request = supertest(app);
  let userToken: string;
  let userId: number;
  beforeAll(async () => {
    const goodUser = { email: "mytestuser@mail.com", password: "abcd1234" };
    const response = await request.post("/api/users/login").send(goodUser);
    userToken = response.body.token;
  });

  describe("create new product", () => {
    it("should create a new product", async () => {
      const response = await request
        .post("/api/products/new")
        .set({ Authorization: `Bearer ${userToken}` })
        .send({ name: "foo", price: 100 });
      expect(response.status).toEqual(200);
    });
    it("should fail if missing required params", async () => {
      const response = await request
        .post("/api/products/new")
        .set({ Authorization: `Bearer ${userToken}` })
        .send({ name: "foo" });

      expect(response.status).toEqual(400);
    });
  });

  describe("get all products", () => {
    it("should fetch all prodcts in the database", async () => {
      const response = await request
        .get("/api/products/all")
        .set({ Authorization: `Bearer ${userToken}` });

      expect(response.status).toEqual(200);
      expect(response.body.products).toBeDefined();
    });
  });

  describe("order a product", () => {
    it("should order a new product", async () => {
      const response = await request
        .post("/api/products/orderproduct")
        .set({ Authorization: `Bearer ${userToken}` })
        .send({ productId: 1, userId: 1, quantity: 4 });

      expect(response.status).toEqual(200);
    });
  });

  describe("get product by id", () => {
    it("should find a product by id", async () => {
      const response = await request
        .get("/api/products/1")
        .set({ Authorization: `Bearer ${userToken}` });

      expect(response.status).toEqual(200);
      expect(response.body.product).toBeDefined();
    });
  });
});
