export interface IOrderForm {
	payment: string;
	address: string;
}

export interface IContactForm {
	phone: string;
	email: string;
}

export interface IOrderFieldData extends IOrderForm, IContactForm {}

export interface IOrder extends IOrderFieldData {
	items: string[];
	total: number;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IBasket {
	items: Map<string, number>;
}

export interface IBasketItemView {
	title: HTMLSpanElement;
	addButton: HTMLButtonElement;
	removeButton: HTMLButtonElement;
}

export interface ICatalogItem {
	_index: HTMLElement;
	_title: HTMLElement;
	_description: HTMLElement;
	_category: HTMLElement;
	_price: HTMLElement;
	_image: HTMLElement;
	_button: HTMLElement;
	_buttonTitle: HTMLElement;
	_status: HTMLElement;
}

export interface IProduct {
	id: string;
	title: string;
	description: string;
	price: number | null;
	category: string;
	image: string;
}

export interface IBasketItem extends IProduct {
	index: number;
}

export interface IActions {
	click?: (e: Event) => void;
}
