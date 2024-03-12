import { IActions, IProduct } from '../types';
import { Card } from './common/Card';

export class CatalogItem extends Card<IProduct> {
	constructor(container: HTMLElement, actions?: IActions) {
		super('card', container, actions);
	}
}
