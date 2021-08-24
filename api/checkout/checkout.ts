import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { PriceCalculator } from "../../shared/misc/priceCalculator";
import { toDictionary } from "../../shared/misc/toDictionary";
import { createOrderedQtyMap } from "../../shared/misc/orderedQtyMap";
import { ProductRepository } from "../../shared/repositores/productRepository";
import { Product } from "../../shared/models/product";
import { lambdaApiGatewayResponse } from "../../shared/misc/lambdaHelper";

const productRepository = new ProductRepository();
const priceCalculator = new PriceCalculator();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const orderedProductIds: string[] = JSON.parse(event.body) as string[];

    if (!Array.isArray(orderedProductIds)) {
        return lambdaApiGatewayResponse(400, {
            error: "Invalid input.",
        });
    }

    let products: Product[];

    try {
        products = await productRepository.getProductsByIds(orderedProductIds);
    } catch (err) {
        return lambdaApiGatewayResponse(500, {
            error: err.message,
        });
    }

    const productsById = toDictionary(products, "id");
    const orderedQtyByProductId = createOrderedQtyMap(orderedProductIds);
    const totalPrice = priceCalculator.calculateTotalPrice(orderedQtyByProductId, productsById);

    return lambdaApiGatewayResponse(200, {
        price: totalPrice,
    });
};
