import express, { Request, Response } from 'express';
import checkAuthorization from '../middleware/checkAuthorization';
import { fetchAllProducts, fetchSingleProduct } from '../models/product.model'

const productRouter = express.Router();

productRouter.get('/all', checkAuthorization, async (req: Request, res: Response) => {
  try {
    const products = await fetchAllProducts();
    res.status(200).json({ products })
  } catch (err) {
    res.status(500).json({ error: 'Internal Application Error'})
  }
})

productRouter.get('/:id', checkAuthorization, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await fetchSingleProduct(id);
    res.status(200).json({ product })
  } catch (err) {
    res.status(500).json({ error: 'Internal Application Error'})
  }
})

export default productRouter;