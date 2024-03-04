import './scss/styles.scss';



// const events = new EventEmitter();
// const basket = new BasketModel(events);

// events.on('basket:change', (data: { items: string[] }) => {
//  //выводим куда-то
// });




// //инициализация
// const api = new ShopAPI();
// const events = new EventEmitter();
// const basketView = new BasketView(document.querySelector('.basket'));
// const basketModel = new BasketModel(events);
// const catalogModel = new CatalogModel(events);

// //можно собрать в функции или классы отдельные экраны с логикой их формирования
// function renderBasket(item: string[]) {
//   basketView.render(
//     items.map(id => {
//       const itemView = new BasketItemView(events);
//       return itemView.render(catalogModel.getProduct(id));
//     })
//   );
// }

// //при изменении рендерим
// events.on('basket:change', (event: { items: string[]}) => {
//   renderBasket(event.items);
// });

// //при действиях изменяем модель, а после этого случится рендер
// events.on('ui:basket-add', (event: { id: string }) => {
//   basketModel.remove(event.id);
// });

// //подгружаем начальные данные и запускаем процессы
// api.getCatalog()
// .then(catalogModel.setItems.bind(catalogModel))
// .catch(err => console.error(err));
