import { Component } from '../base/Component';
import { bem, ensureElement, formatter } from '../../utils/utils';
import { IActions, IProduct } from '../../types';

enum CategoryClassMapper {
	'софт-скил' = 'soft',
	'другое' = 'other',
	'дополнительное' = 'additional',
	'кнопка' = 'button',
	'хард-скил' = 'hard',
}

export class Card<T> extends Component<T> {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _category?: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _button: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: IActions
	) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
		this._button = ensureElement<HTMLButtonElement>(
			`.${blockName}__button`,
			container
		);

		this._category = container.querySelector(`.${blockName}__category`);
		this._image = container.querySelector(`.${blockName}__image`);

		if (actions) {
			Object.entries(actions).forEach(([action, func]) => {
				this._button.addEventListener(action, func);
			});
		}
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: number | null) {
		this.setText(
			this._price,
			value ? `${formatter.format(value)} синапсов` : 'Бесценно'
		);
	}

	set category(value: string) {
		this.setText(this._category, value);

		const categoryClass = bem(
			this.blockName,
			'category',
			CategoryClassMapper[value as keyof typeof CategoryClassMapper]
		);
		this._category?.classList.add(categoryClass.name);
	}

	set image(value: string) {
		this.setImage(this._image, value, this._title.textContent);
	}
}
