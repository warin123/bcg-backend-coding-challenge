import { Product } from "../models/product";

export interface IProductRepository {
    getProductsByIds(productIds: string[]): Promise<Product[]>;
}

export class ProductRepository implements IProductRepository {
    public async getProductsByIds(productIds: string[]): Promise<Product[]> {
        return [];
    }
}
