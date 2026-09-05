import { Category } from "./item-type";

export interface SearchRequest {
    name: string;
    category: Category;
}