import { ensureElement, formatter } from '../../utils/utils';
import { Component } from '../base/Component';
import { IActions } from '../../types';

interface ISuccess {
	total: number;
}

export class Success extends Component<ISuccess> {
	protected _close: HTMLButtonElement;
	protected _total: HTMLElement;

	constructor(container: HTMLElement, actions?: IActions) {
		super(container);

		this._close = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			container
		);
		this._total = ensureElement<HTMLElement>(
			'.order-success__description',
			container
		);

		if (actions) {
			Object.entries(actions).forEach(([action, func]) => {
				this._close.addEventListener(action, func);
			});
		}
	}

	set total(value: number) {
		this.setText(this._total, `Списано ${formatter.format(value)} синапсов`);
	}
}