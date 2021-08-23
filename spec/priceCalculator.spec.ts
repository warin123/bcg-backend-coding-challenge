import { Product } from "../shared/models/product";
import { PriceCalculator } from "../shared/misc/priceCalculator";
import { toDictionary } from "../shared/misc/toDictionary";

describe("PriceCalculator Test", () => {
    const priceCalculator = new PriceCalculator();

    it("should calculate the correct price for a product without a discount", () => {
        const product: Product = {
            id: "003",
            name: "Swatch",
            unitPrice: 50,
        };
        const orderedQty = 3;
        const price = priceCalculator.calculatePrice(orderedQty, product);
        expect(price).toBe(product.unitPrice * orderedQty);
    });

    it("should calculate the correct price for a product with applying the quantity discount", () => {
        const product: Product = {
            id: "001",
            name: "Rolex",
            unitPrice: 100,
            discount: {
                type: "quantity",
                qty: 3,
                price: 200,
            },
        };
        const orderedQty = 4;
        const price = priceCalculator.calculatePrice(orderedQty, product);
        expect(price).toBe(300);
    });

    it("should calculate the correct price for a product with applying the quantity discount and one without", () => {
        const products: Product[] = [
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
                id: "003",
                name: "Swatch",
                unitPrice: 50,
            },
        ];
        const price = priceCalculator.calculateTotalPrice(
            {
                "001": 3,
                "003": 1,
            },
            toDictionary(products, "id")
        );
        expect(price).toBe(250);
    });

    it("should calculate the correct total price for multiple products without applying the quantity discount", () => {
        const products: Product[] = [
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
        const price = priceCalculator.calculateTotalPrice(
            {
                "001": 2,
                "002": 1,
                "003": 1,
                "004": 1,
            },
            toDictionary(products, "id")
        );
        expect(price).toBe(360);
    });
});
