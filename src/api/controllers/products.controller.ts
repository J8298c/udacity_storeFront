import express, { Request, Response } from "express";
import {
  createNewProduct,
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

productRouter.post("/new", async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: "missing required parameters" });
    }
    const newProduct = await createNewProduct(name, price);
    return res.status(200).json({ product: newProduct });
  } catch (err) {
    return res.status(500).json({ error: "Error creating new product" });
  }
});

export default productRouter;
