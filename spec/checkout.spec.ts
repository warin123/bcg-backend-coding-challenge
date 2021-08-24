import { handler } from "../api/checkout/checkout";
import { lambdaApiGatewayEvent } from "../shared/misc/lambdaHelper";

describe("Checkout Test", () => {
    it("should return an error if the req.body is not a string array", async () => {
        const event = lambdaApiGatewayEvent({}, "post");
        const result = await handler(event);
        const jsonResult = JSON.parse(result.body);
        expect(jsonResult.error).toBeDefined();
    });

    it("should return price 0 for empty productId list", async () => {
        const event = lambdaApiGatewayEvent([], "post");
        const result = await handler(event);
        const jsonResult = JSON.parse(result.body);
        expect(jsonResult.price).toBe(0);
    });

    it("should return the correct price for a product", async () => {
        const event = lambdaApiGatewayEvent(["001"], "post");
        const result = await handler(event);
        const jsonResult = JSON.parse(result.body);
        expect(jsonResult.price).toBe(100);
    });
});
