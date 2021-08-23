import { Discount } from "./discount";

export interface Product {
    id: string;
    name: string;
    unitPrice: number;
    discount?: Discount;
}
