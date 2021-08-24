import { Dictionary } from "../models/dictionary";
import { Product } from "../models/product";
import { Discount, QuantityDiscount } from "../models/discount";

export interface IPriceCalculator {
    calculateTotalPrice(
        orderedQtyByProductId: Dictionary<number>,
        productsById: Dictionary<Product>
    ): number;
    calculatePrice(orderedQty: number, product: Product): number;
}

export class PriceCalculator implements IPriceCalculator {
    private readonly calculatePriceByDiscountType: {
        [key in Discount["type"]]: (
            unitPrice: number,
            orderedQty: number,
            discount: Discount
        ) => number;
    } = {
        quantity: (orderedQty: number, unitPrice: number, discount: QuantityDiscount) => {
            const regularPricedQty = orderedQty % discount.qty;
            const speciallyPricedQty = Math.floor(orderedQty / discount.qty);
            return speciallyPricedQty * discount.price + regularPricedQty * unitPrice;
        },
    };

    public calculateTotalPrice(
        orderedQtyByProductId: Dictionary<number>,
        productsById: Dictionary<Product>
    ): number {
        return Object.keys(orderedQtyByProductId).reduce(
            (totalPrice: number, orderedProductId: string) => {
                const orderedQty = orderedQtyByProductId[orderedProductId];
                const product = productsById[orderedProductId];
                return totalPrice + this.calculatePrice(orderedQty, product);
            },
            0
        );
    }

    public calculatePrice(orderedQty: number, product: Product): number {
        if (!product.discount) {
            return product.unitPrice * orderedQty;
        }

        return this.calculatePriceByDiscountType[product.discount.type](
            orderedQty,
            product.unitPrice,
            product.discount
        );
    }
}
