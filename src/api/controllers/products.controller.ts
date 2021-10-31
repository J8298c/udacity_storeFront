import express, { Request, Response } from "express";
import { fetchAllProducts } from "../services/prodcuts.service";

const productRouter = express.Router();

productRouter.get(
  "/all",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await fetchAllProducts();
      res.status(200).json({ products });
    } catch (err) {
      res.status(500).json({ err: `error fetching products ${err}` });
    }
  }
);

export default productRouter;
