export interface IOrderForm {
  payment: string;
  address: string;
}

export interface IContactForm {
  phone: string;
  email: string;
}

export interface IOrder extends IOrderForm, IContactForm {
  items: string[]
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IBasket {
	items: Map<string, number>;
	add(id: string): void;
	remove(id: string): void;
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
  id: string
  title: string
  description: string
  price: number | null
  category: string
  image: string
}