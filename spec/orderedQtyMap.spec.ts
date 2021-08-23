import { createOrderedQtyMap } from "../shared/misc/orderedQtyMap";

describe("OrderedQtyMap Test", () => {
    it("should create an empty orderedQtyMap for an empty orderedProductId array", () => {
        const orderedQtyMap = createOrderedQtyMap([]);
        expect(Object.keys(orderedQtyMap).length).toBe(0);
    });

    it("should create the correct orderedQtyMap for a single productId", () => {
        const orderedQtyMap = createOrderedQtyMap(["001"]);
        expect(Object.keys(orderedQtyMap).length).toBe(1);
        expect(orderedQtyMap["001"]).toBe(1);
    });

    it("should create the correct orderedQtyMap for duplicate productIds", () => {
        const orderedQtyMap = createOrderedQtyMap(["001", "002", "001"]);
        expect(Object.keys(orderedQtyMap).length).toBe(2);
        expect(orderedQtyMap["001"]).toBe(2);
        expect(orderedQtyMap["002"]).toBe(1);
    });
});
