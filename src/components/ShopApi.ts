import { IProduct, IOrder, IOrderResult } from '../types';
import { Api, ApiListResponse } from './base/Api';

export class ShopAPI extends Api {
	constructor(
		baseUrl: string,
		protected cdnUrl: string,
		options: RequestInit = {}
	) {
		super(baseUrl, options);
	}

	getProductList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: `${this.cdnUrl}${item.image}`,
			}))
		);
	}

	getProduct(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((data: IProduct) => ({
			...data,
			image: `${this.cdnUrl}${data.image}`,
		}));
	}

	setOrder(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}
