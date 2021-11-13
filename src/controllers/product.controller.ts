import express, { Request, Response } from 'express';
import checkAuthorization from '../middleware/checkAuthorization';
import { fetchAllProducts, fetchSingleProduct, orderProduct } from '../models/product.model'

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

.post('/orderproduct', checkAuthorization, async (req: Request, res: Response) => {
  try {
    const { productId, userId, quantity } = req.body;
    if (!productId || !userId || !quantity) {
      res.status(400).json({ error: 'Missing required parameter'})
      return;
    }
    await orderProduct(Number(productId), Number(userId), Number(quantity))
    res.status(200).json({ message: 'Product ordered' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "internal application error"})
  }
})

export default productRouter;