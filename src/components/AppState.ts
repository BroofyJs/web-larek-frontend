import { IOrder, IProduct, IOrderForm, IContactForm } from "../types";
import { Model } from "./base/Model";

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IAppState {
	catalog: IProduct[];
	basket: IProduct[];
	order: IOrder;
	preview: string | null;
	formErrors: FormErrors;
}

export class AppState extends Model<IAppState> {
	catalog: IProduct[];
	basket: IProduct[];
	order: IOrder;
	preview: string | null;
	formErrors: FormErrors = {};

	setCatalog(items: IProduct[]) {}

	setPreview(item: IProduct) {}

	addToBasket(item: IProduct) {}

	removeFromBasket(item: IProduct) {}

	clearBasket() {}

	clearOrder() {}

	setOrderField(field: keyof IOrderForm, value: string) {}

	setContactField(field: keyof IContactForm, value: string) {}
}
