import { Card } from './Card';
import { IProduct, IActions } from '../../types';
import { ensureElement } from '../../utils/utils';

export class ProductView extends Card<IProduct> {
	protected _description: HTMLElement;

	constructor(container: HTMLElement, actions?: IActions) {
		super('card', container, actions);
		this._description = ensureElement<HTMLElement>('.card__text', container);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set price(value: number | null) {
		super.price = value;

		if (!value) {
			this.setDisabled(this._button, true);
		}
	}
}
