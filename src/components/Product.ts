import { IProduct } from "../types";
import { Model } from "./base/Model"

export class Product extends Model<IProduct> {
    id: string;
    title: string;
    description: string;
    price: number | null;
    category: string;
    image: string;
}