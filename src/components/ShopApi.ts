import { IProduct, IOrder, IOrderResult } from '../types';
import { Api } from './base/api';


export class ShopAPI extends Api {
	constructor(baseUrl: string, options: RequestInit = {}) {
		super(baseUrl, options);
	}

	getProductList(): Promise<IProduct[]> {
		return new Promise(() => {});
	}

	getProduct(id: string): Promise<IProduct> {
		return new Promise(() => {});
	}

	setOrder(order: IOrder): Promise<IOrderResult> {
		return new Promise(() => {});
	}
}
