import { Product } from "../models/product";
import { Dictionary } from "../models/dictionary";
import { toDictionary } from "../misc/toDictionary";

export interface IProductRepository {
    getProductsByIds(productIds: string[]): Promise<Product[]>;
}

export class ProductRepository implements IProductRepository {
    private readonly products: Product[];
    private readonly productsById: Dictionary<Product>;

    constructor() {
        this.products = [
            {
                id: "001",
                name: "Rolex",
                unitPrice: 100,
                discount: {
                    type: "quantity",
                    qty: 3,
                    price: 200,
                },
            },
            {
                id: "002",
                name: "Michael Kors",
                unitPrice: 80,
                discount: {
                    type: "quantity",
                    qty: 2,
                    price: 120,
                },
            },
            {
                id: "003",
                name: "Swatch",
                unitPrice: 50,
            },
            {
                id: "004",
                name: "Casio",
                unitPrice: 30,
            },
        ];
        this.productsById = toDictionary(this.products, "id");
    }

    public async getProductsByIds(productIds: string[]): Promise<Product[]> {
        const products: Product[] = [];

        for (const productId of productIds) {
            if (!(productId in this.productsById)) {
                continue;
            }
            products.push(this.productsById[productId]);
        }

        return products;
    }
}

