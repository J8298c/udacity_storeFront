import express, { Request, Response } from "express";
import {
  fetchAllProducts,
  fetchSingleProduct,
} from "../services/prodcuts.service";

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

productRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await fetchSingleProduct(req.params.id);
    return res.status(200).json({ product });
  } catch (err) {
    return res
      .status(500)
      .json({ err: `error fetching product ${req.params.id}` });
  }
});

export default productRouter;
