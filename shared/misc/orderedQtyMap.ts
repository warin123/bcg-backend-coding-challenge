import { Dictionary } from "../models/dictionary";

export function createOrderedQtyMap(orderedProductIds: string[]): Dictionary<number> {
    const orderedQtyMap: Dictionary<number> = {};

    for (const orderedProductId of orderedProductIds) {
        orderedQtyMap[orderedProductId] =
            (orderedQtyMap[orderedProductId] || 0) + 1;
    }

    return orderedQtyMap;
}
