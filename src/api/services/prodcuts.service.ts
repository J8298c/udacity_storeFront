import { getAllProducts, getProduct } from "../dao/products.dao";
import { Product } from "../interfaces/Products";

export const fetchAllProducts = (): Promise<Product[]> => {
  return getAllProducts();
};
