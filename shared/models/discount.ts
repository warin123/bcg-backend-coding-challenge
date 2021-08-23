export type Discount = QuantityDiscount;

export interface QuantityDiscount {
    type: "quantity";
    qty: number;
    price: number;
}
