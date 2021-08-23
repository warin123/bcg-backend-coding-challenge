import { Dictionary } from "../models/dictionary";

export function toDictionary<T>(entries: T[], property: string): Dictionary<T> {
    const entriesById: Dictionary<T> = {};
    for (let entry of entries) {
        entriesById[entry[property]] = entry;
    }
    return entriesById;
}
