import { Dictionary } from "../models/dictionary";
import { Product } from "../models/product";

export interface IPriceCalculator {
    calculateTotalPrice(
        orderedQtyByProductId: Dictionary<number>,
        productsById: Dictionary<Product>
    ): number;
    calculatePrice(orderedQty: number, product: Product): number;
}

export class PriceCalculator implements IPriceCalculator {
    public calculateTotalPrice(
        orderedQtyByProductId: Dictionary<number>,
        productsById: Dictionary<Product>
    ): number {
        return -1;
    }

    public calculatePrice(orderedQty: number, product: Product): number {
        return -1;
    }
}
