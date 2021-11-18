import express, { Request, Response } from "express";
import checkAuthorization from "../middleware/checkAuthorization";
import {
  fetchAllProducts,
  fetchOrders,
  fetchSingleProduct,
  orderProduct,
} from "../models/product.model";

const productRouter = express.Router();

productRouter.get(
  "/all",
  checkAuthorization,
  async (req: Request, res: Response) => {
    try {
      const products = await fetchAllProducts();
      res.status(200).json({ products });
    } catch (err) {
      res.status(500).json({ error: "Internal Application Error" });
    }
  }
);

productRouter.get(
  "/orders",
  checkAuthorization,
  async (req: Request, res: Response) => {
    try {
      console.log("hello its me");
      const orders = await fetchOrders();
      console.log(orders);
      return res.status(200).json({ orders });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "internal application error" });
    }
  }
);

productRouter.get(
  "/:id",
  checkAuthorization,
  async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const product = await fetchSingleProduct(id);
      res.status(200).json({ product });
    } catch (err) {
      res.status(500).json({ error: "Internal Application Error" });
    }
  }
);

productRouter.post(
  "/new",
  checkAuthorization,
  async (req: Request, res: Response) => {
    try {
      const { name, price } = req.body;

      if (!name && !price) {
        res.status(400).json({ error: "Missing required parameters" });
        return;
      }
      res
        .status(200)
        .json({ success: true, message: `${name} created successfully` });
    } catch (err) {
      res.status(500).json({ error: "Internal Application Error" });
    }
  }
);

productRouter.post(
  "/orderproduct",
  checkAuthorization,
  async (req: Request, res: Response) => {
    try {
      const { productId, userId, quantity } = req.body;
      if (!productId || !userId || !quantity) {
        res.status(400).json({ error: "Missing required parameter" });
        return;
      }
      await orderProduct(Number(productId), Number(userId), Number(quantity));
      res.status(200).json({ message: "Product ordered" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "internal application error" });
    }
  }
);

export default productRouter;
