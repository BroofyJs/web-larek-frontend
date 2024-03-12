import { IOrder, IProduct, IOrderFieldData } from '../../types';
import { Model } from '../base/Model';
import { IEvents } from '../base/Events';
import { Events } from '../../types/events';

export type FormErrors = Partial<Record<keyof IOrderFieldData, string>>;

export interface IAppState {
	catalog: IProduct[];
	basket: Record<string, IProduct>;
	order: IOrder;
	formErrors: FormErrors;
}

const initialStateOrder: IOrder = {
	address: '',
	email: '',
	phone: '',
	payment: '',
	items: [],
	total: 0,
};

export class AppState extends Model<IAppState> {
	basket: Record<string, IProduct> = {};
	order: IOrder = initialStateOrder;
	formErrors: FormErrors = {};

	constructor(data: Partial<IAppState>, events: IEvents) {
		super(data, events);
	}

	set catalog(items: IProduct[]) {
		this.emitChanges(Events.CATALOG_CHANGED, { catalog: items });
	}

	setPreview(item: IProduct) {
		this.emitChanges(Events.PREVIEW_CHANGED, item);
	}

	addToBasket(item: IProduct) {
		this.basket[item.id] = item;
		this.emitChanges(Events.BASKET_CHANGED);
	}

	getBasketLength(): number {
		return Object.values(this.basket).length;
	}

	removeFromBasket(item: IProduct) {
		delete this.basket[item.id];
		this.emitChanges(Events.BASKET_CHANGED);
	}

	clearBasket() {
		this.basket = {};
		this.emitChanges(Events.BASKET_CHANGED);
	}

	clearOrder() {
		this.order = {
			address: '',
			email: '',
			phone: '',
			payment: '',
			items: [],
			total: 0,
		};
	}

	setOrderField(field: keyof IOrderFieldData, value: string) {
		Object.assign(this.order, {
			[field]: value,
		});

		this.validateOrder();
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};

		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}

		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		if (!this.order.payment) {
			errors.payment = 'Необходимо выбрать оплату';
		}

		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}

		this.formErrors = errors;
		this.events.emit(Events.FORMERRORS_CHANGE, this.formErrors);

		return Object.keys(errors).length === 0;
	}

	getBasketTotal() {
		return Object.values(this.basket).reduce(
			(accumulator, item) => accumulator + (item.price ?? 0),
			0
		);
	}
}
