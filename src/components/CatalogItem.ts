import { ICatalogItem, IProduct } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

class CatalogItem extends Component<ICatalogItem> {
    _index: HTMLElement;
    _title: HTMLElement;
    _description: HTMLElement;
    _category: HTMLElement;
    _price: HTMLElement;
    _image: HTMLElement;
    _button: HTMLElement;
    _status: HTMLElement;

    constructor(container: HTMLElement, product: IProduct) {
        super(container);
        
        this._title = ensureElement<HTMLButtonElement>('.catalog_item__title', container);
        this._description = ensureElement<HTMLButtonElement>('.catalog_item__description', container);
        this._category = ensureElement<HTMLButtonElement>('.catalog_item__category', container);
        this._price = ensureElement<HTMLButtonElement>('.catalog_item__price', container);
        this._image = ensureElement<HTMLButtonElement>('.catalog_item__image', container);
        this._button = ensureElement<HTMLButtonElement>('.catalog_item__button', container);
        this._status = ensureElement<HTMLButtonElement>('.catalog_item__status', container);


        this._button.addEventListener('click', () => {});
    }

}