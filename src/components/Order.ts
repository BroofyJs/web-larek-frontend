import { IOrderForm, IContactForm } from '../types';
import { ensureElement } from '../utils/utils';
import { Form } from './common/Form';
import { IEvents } from './base/Events';

export type PaymentType = 'cash' | 'card';

export class OrderForm extends Form<IOrderForm> {
	_paymentOnlineButton: HTMLButtonElement;
	_paymentReceiptButton: HTMLButtonElement;
	_address: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._paymentOnlineButton = ensureElement<HTMLButtonElement>(
			'[name="card"]',
			container
		);
		this._paymentReceiptButton = ensureElement<HTMLButtonElement>(
			'[name="cash"]',
			container
		);
		this._address = ensureElement<HTMLInputElement>(
			'[name="address"]',
			container
		);

		this._paymentOnlineButton.addEventListener('click', () => {
			this.payment = 'card';
		});
		this._paymentReceiptButton.addEventListener('click', () => {
			this.payment = 'cash';
		});
	}

	set payment(value: PaymentType) {
		this._paymentOnlineButton.classList.remove('button_alt-active');
		this._paymentReceiptButton.classList.remove('button_alt-active');

		if (value) {
			const paymentMethod = ensureElement<HTMLButtonElement>(
				`[name="${value}"]`,
				this.container
			);
			paymentMethod.classList.add('button_alt-active');

			this.events.emit('order.payment:change', { field: 'payment', value });
		}
	}

	set address(value: string) {
		this._address.value = value;
	}
}

export class ContactForm extends Form<IContactForm> {
	_phone: HTMLInputElement;
	_email: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this._phone = ensureElement<HTMLInputElement>('[name="phone"]', container);
		this._email = ensureElement<HTMLInputElement>('[name="email"]', container);
	}

	set phone(value: string) {
		this._phone.value = value;
	}

	set email(value: string) {
		this._email.value = value;
	}
}
