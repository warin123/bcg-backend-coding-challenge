import { ProductRepository } from "../shared/repositores/productRepository";

describe("ProductRepository Test", () => {
    const productRepository = new ProductRepository();

    it("should return no products for an empty productId array", async () => {
        const products = await productRepository.getProductsByIds([]);
        expect(products.length).toBe(0);
    });

    it("should return no products in case no products exist with given ids", async () => {
        const products = await productRepository.getProductsByIds(["invalid", "invalid2"]);
        expect(products.length).toBe(0);
    });

    it("should return only products that exist with given ids", async () => {
        const productId = "001";
        const products = await productRepository.getProductsByIds(["invalid", productId]);
        expect(products.length).toBe(1);
        expect(products[0].id).toBe(productId);
    });

    it("should return a single product by its id", async () => {
        const productId = "001";
        const products = await productRepository.getProductsByIds([productId]);
        expect(products.length).toBe(1);
        expect(products[0].id).toBe(productId)
    });

    it("should return multiple products by their ids in the right order", async () => {
        const productId1 = "001";
        const productId2 = "002";
        const products = await productRepository.getProductsByIds([productId1, productId2]);
        expect(products.length).toBe(2);
        expect(products[0].id).toBe(productId1);
        expect(products[1].id).toBe(productId2);
    });
});
