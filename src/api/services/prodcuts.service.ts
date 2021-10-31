import { getAllProducts, getProduct } from "../dao/products.dao";
import { Product } from "../interfaces/Products";

export const fetchAllProducts = (): Promise<Product[]> => {
  return getAllProducts();
};

export const fetchSingleProduct = (id: string): Promise<Product> => {
  // TODO: check if id is number here if not return null
  return getProduct(Number(id));
};
