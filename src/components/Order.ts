import { IOrderForm, IContactForm } from "../types";
import { ensureElement } from "../utils/utils";
import { Form } from "./Form";
import { IEvents } from "./base/events";


class OrderForm extends Form<IOrderForm> {
    _paymentOnlineButton: HTMLButtonElement;
    _paymentReceiptButton: HTMLButtonElement;
    _address: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    
        this._paymentOnlineButton = ensureElement<HTMLButtonElement>('.order_form__payment_online', container);
        this._paymentReceiptButton = ensureElement<HTMLButtonElement>('.order_form__payment_receipt', container);
        this._address = ensureElement<HTMLInputElement>('.order_form__address', container);

        this._paymentOnlineButton.addEventListener('click', () => {
            this.payment = 'online';
        })
        this._paymentReceiptButton.addEventListener('click', () => {
            this.payment = 'receipt';
        })
    } 

    set payment(value: string) {
        this._paymentOnlineButton.classList.remove('active');
        this._paymentReceiptButton.classList.remove('active');

        const paymentMethod = ensureElement<HTMLButtonElement>(`.order_form__payment_${value}`, this.container)
        paymentMethod.classList.add('active');
    }

    set address(value: string) {
        this._address.value = value;
    }
}

class ContactForm extends Form<IContactForm> {
    _phone: HTMLInputElement;
    _email: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this._phone = ensureElement<HTMLInputElement>('.contact_form__phone', container);
        this._email = ensureElement<HTMLInputElement>('.contact_form__email', container);
    }
    
    set phone(value: string) {
        this._phone.value = value;
    }
    
    set email(value: string) {
        this._email.value = value;
    }
}