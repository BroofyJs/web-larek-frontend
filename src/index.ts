import './scss/styles.scss';
import { ShopAPI } from './components/ShopApi';
import { EventEmitter } from './components/base/Events';
import { AppState } from './components/models/AppState';
import { Page } from './components/common/Page';
import { Modal } from './components/common/Modal';
import { Basket, BasketItem } from './components/common/Basket';
import { OrderForm, ContactForm } from './components/Order';
import { ensureElement, cloneTemplate } from './utils/utils';
import { API_URL, CDN_URL } from './utils/constants';
import { CatalogItem } from './components/CatalogItem';
import { IOrderFieldData, IProduct } from './types';
import { Events } from './types/events';
import { ProductView } from './components/ProductView';
import { Success } from './components/common/Success';

const catalogItemTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const api = new ShopAPI(API_URL, CDN_URL);
const events = new EventEmitter();
const app = new AppState({}, events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const orderForm = new OrderForm(cloneTemplate(orderTemplate), events);
const contactForm = new ContactForm(cloneTemplate(contactsTemplate), events);
const successForm = new Success(cloneTemplate(successTemplate), {
	click: () => {
		modal.close();
	},
});

api
	.getProductList()
	.then((items) => {
		app.catalog = items;
	})
	.catch((err) => console.error(err));

events.on(Events.CATALOG_CHANGED, (payload: { catalog: IProduct[] }) => {
	page.catalog = payload.catalog.map((item) => {
		const catalogItem = new CatalogItem(
			catalogItemTemplate.content.cloneNode(true) as HTMLElement,
			{
				click: () => {
					events.emit(Events.PRODUCT_SELECT, item);
				},
			}
		);

		return catalogItem.render(item);
	});
});

events.on(Events.PRODUCT_SELECT, (item: IProduct) => {
	app.setPreview(item);
});

events.on(Events.PREVIEW_CHANGED, (item: IProduct) => {
	const showItem = (item: IProduct) => {
		const card = new ProductView(cloneTemplate(cardPreviewTemplate), {
			click: () => {
				events.emit(Events.BASKET_ADD, item);
			},
		});

		modal.render({
			content: card.render(item),
		});
	};

	if (item) {
		api
			.getProduct(item.id)
			.then((result) => {
				showItem(result);
			})
			.catch((err) => {
				console.error(err);
			});
	} else {
		modal.close();
	}
});

events.on(Events.MODAL_OPEN, () => {
	page.locked = true;
});

events.on(Events.MODAL_CLOSE, () => {
	page.locked = false;
});

events.on(Events.BASKET_ADD, (item: IProduct) => {
	app.addToBasket(item);

	modal.close();
});

events.on(Events.BASKET_REMOVE, (item: IProduct) => {
	app.removeFromBasket(item);
	events.emit(Events.BASKET_OPEN);
});

events.on(Events.BASKET_CHANGED, () => {
	page.counter = app.getBasketLength();

	basket.items = Object.values(app.basket).map((item, index) => {
		const card = new BasketItem(cloneTemplate(cardBasketTemplate), {
			click: () => {
				events.emit(Events.BASKET_REMOVE, item);
			},
		});

		return card.render({
			...item,
			index: ++index,
		});
	});

	const total = app.getBasketTotal();

	basket.total = total;
	app.order.total = total;

	app.order.items = Object.keys(app.basket);
});

events.on(Events.BASKET_OPEN, () => {
	modal.render({
		content: basket.render(),
	});
});

events.on(Events.ORDER_OPEN, () => {
	modal.render({
		content: orderForm.render({
			...app.order,
			valid: false,
			errors: [],
		}),
	});
});

events.on(
	/^(order|contacts)\..*:change/,
	({ field, value }: { field: keyof IOrderFieldData; value: string }) => {
		app.setOrderField(field, value);
	}
);

events.on(Events.ORDER_SUBMIT, () => {
	modal.render({
		content: contactForm.render({
			...app.order,
			valid: false,
			errors: [],
		}),
	});
});

events.on(Events.FORMERRORS_CHANGE, (errors: Partial<IOrderFieldData>) => {
	const { phone, email, address, payment } = errors;

	orderForm.valid = !payment && !address;
	orderForm.errors = [payment, address].filter((i) => !!i).join('; ');

	contactForm.valid = !email && !phone;
	contactForm.errors = [phone, email].filter((i) => !!i).join('; ');
});

events.on(Events.CONTACTS_SUBMIT, () => {
	api
		.setOrder(app.order)
		.then((data) => {
			modal.render({
				content: successForm.render({
					total: data.total,
				}),
			});
		})
		.then(() => {
			app.clearBasket();
			app.clearOrder();
		})
		.catch((err) => console.error(err));
});
