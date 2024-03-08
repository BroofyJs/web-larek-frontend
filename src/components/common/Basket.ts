import { IActions, IBasket, IBasketItem } from '../../types';
import { Events } from '../../types/events';
import { ensureElement, createElement, formatter } from '../../utils/utils';
import { Card } from './Card';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', container);
		this._total = ensureElement<HTMLElement>('.basket__price', container);
		this._button = ensureElement<HTMLButtonElement>(
			'.basket__action',
			container
		);

		this._button.addEventListener('click', () => {
			this.events.emit(Events.ORDER_OPEN);
		});

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		this.setDisabled(this._button, !Boolean(items.length));

		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set total(value: number) {
		this.setText(
			this._total,
			value ? `${formatter.format(value)} синапсов` : '0 синапсов'
		);
	}

	get total() {
		return this.total;
	}
}

export class BasketItem extends Card<IBasketItem> {
	protected _index: HTMLElement;

	constructor(container: HTMLElement, actions?: IActions) {
		super('basket-item', container, actions);

		this._index = ensureElement('.basket-item__index', container);
	}

	set index(value: number) {
		this.setText(this._index, value);
	}
}
