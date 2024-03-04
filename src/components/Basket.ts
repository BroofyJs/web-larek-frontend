import { IBasket, IBasketItemView, IProduct } from '../types';
import { ensureElement, createElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';


export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', container);
		this._total = ensureElement<HTMLElement>('.basket__total', container);
		this._button = ensureElement<HTMLButtonElement>('.basket__action', container);

    this._button.addEventListener('click', () => {
      this.events.emit('order:open');
    });

		
	}

	add(id: string): void {
		if (!this.items.has(id)) this.items.set(id, 0); 
		this.items.set(id, this.items.get(id)! + 1); 
		this._changed();
	}

	remove(id: string): void {
		if (!this.items.has(id)) return; 
		if (this.items.get(id)! > 0) {
			this.items.set(id, this.items.get(id)! - 1); 
			if (this.items.get(id) === 0) this.items.delete(id); 
		}
		this._changed();
	}

	set items(items: Map<string, number>) {
		if (items.size) {
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set total(total: number) {
		this.setText(this._total, total);
	}

	protected _changed() {
		if (this.items.size) {
			this.setDisabled(this._button, false);
		} else {
			this.setDisabled(this._button, true);
		}
		this.events.emit('basket:change', { items: Array.from(this.items.keys()) });
	}
}

class BasketItem extends Component<IBasketItemView> {
	protected _title: HTMLSpanElement;
	protected _price: HTMLSpanElement;
	protected _removeButton: HTMLButtonElement;

	protected id: string;

	constructor(protected container: HTMLElement, product: IProduct) {
		super(container);

		this._title = ensureElement<HTMLSpanElement>(
			'.basket-item__title',
			container
		);
		this._price = ensureElement<HTMLSpanElement>(
			'.basket-item__price',
			container
		);
		this._removeButton = ensureElement<HTMLButtonElement>(
			'.basket-item__remove',
			container
		);

		this._removeButton.addEventListener('click', () => {});

    this.id = product.id;
    
    this.setText(this._price, product.price)
	}
}
