# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Архитектура проекта
Внутреннее взаимодействие в приложении осуществляется через использование событийной модели. Модели инициируют события, на которые слушатели реагируют в основном коде. Слушатели осуществляют передачу данных компонентам отображения, а также выполняют вычисления на основе этих данных. Кроме того, они могут изменять значения в моделях.

### Модели

#### 1.`Model<T>`

##### Структура и назначение
`Model` это абстрактный базовый класс для всех моделей данных в проекте. Он предоставляет универсальную структуру для управления данными и их взаимодействием с системой событий.   

##### Конструктор
`constructor(data: Partial<T>, events: IEvents)` - Инициализирует модель, заполняя её данными.
##### Методы
- `emitChanges(event: string, payload?: object)` : Отправляет уведомление о том, что модель была изменена. Генерирует событие с указанным именем и данными.
##### Типы данных
- `interface IEvents`   : Интерфейс для системы управления событиями.
   - `on<T extends object>(event: EventName, callback: (data: T) => void): void;` : Используется для подписки на событие. Строка `event`, представляющая имя события. Функция `callback`, которая будет вызвана при срабатывании события. 
   - `emit<T extends object>(event: string, data?: T): void;` : Используется для вызова события. Строка `event`, представляющая имя события. Объект `data`, представляющий данные, связанные с событием
   - `trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;` : Метод похож на `emit`, но он возвращает функцию, которая может быть вызвана для вызова события с определенными данными. Строка `event`, представляющая имя события. Объект `context`, представляющий контекст, связанный с событием.
- `T` : Дженерик, представляющий структуру данных модели.


#### 2. `Product`

##### Структура и назначение
Класс `Product` отвечает за представление данных товара в проекте. Он обеспечивает структуру для хранения и доступа к характеристикам товара.   
Свойства :   
- `id (string)` : Уникальный идентификатор товара.
- `title (string)` : Название товара.
- `description (string)` : Описание товара.
- `price (number | null)` : Цена товара. Может быть не указана.
- `category (string)` : Категория товара.
- `image (string)` : Ссылка на изображение товара.
##### Типы данных
- `IProduct` : Интерфейс, описывающий структуру товара.
    - `id (string)` : Уникальный идентификатор товара.
    - `title (string)` : Название товара.
    - `description (string)` : Описание товара.
    - `price (number | null)` : Цена товара. Может быть не указана.
    - `category (string)` : Категория товара.
    - `image (string)` : Ссылка на изображение товара.


#### 3. `AppState`

##### Структура и назначение
Класс `AppState` является центральной моделью для управления состоянием проекта, включая каталог товаров, корзину, информацию о заказе и ошибки валидации форм.

Свойства :   
- `catalog: IProduct[]` : Массив товаров в каталоге.
- `basket: Record<string, IProduct>;` : Массив товаров в корзине.
- `order: IOrder` : Объект данных о заказе.
- `formErrors: FormErrors` : Объект с ошибками форм.
##### Конструктор
`constructor(data: Partial<IAppState>, events: IEvents)` : Инициализирует класс с указанием базовых атрибутов модели
##### Методы
- `set catalog(items: IProduct[])` : Устанавливает каталог товаров, иницирует событие изменения каталога.
- `setPreview(item: IProduct)` : Иницирует событие изменения текущего просматриваемого товара.
- `addToBasket(item: IProduct)` : Добавляет товар в корзину, если он там еще не присутствует, инициирует событие изменения корзины.
- `getBasketLength()` : Получает количество добавленных товаров в корзину.
- `removeFromBasket(item: IProduct)` : Удаляет товар из корзины, инициирует событие изменения корзины.
- `clearBasket()` : Очищает корзину и генерирует соответствующее событие.
- `clearOrder()` : Очищает данные заказа.
- `setOrderField(field: keyof IOrderForm, value: string)` : Устанавливает и проверяет поле заказа.
- `validateOrder()` : Проверяет формы заказа.
- `getBasketTotal()` : Получает общую стоимость заказа в корзине.
##### Типы данных
- `IAppState` : Интерфейс для общего состояния приложения. Включает в себя поля для каталога товаров, корзины, текущего заказа, предпросмотра товара и ошибок форм.
    - `catalog: IProduct[]` : Массив товаров в каталоге.
    - `basket: Record<string, IProduct>;` : Массив товаров в корзине.
    - `order: IOrder` : Объект данных о заказе.
    - `formErrors: FormErrors` : Объект с ошибками форм.
- `IOrder` : Описывает структуру заказа. Включает информацию о способе оплаты, адресе доставки, электронной почте, номере телефона, общей стоимости и списка заказанных товаров.
	- `payment: string` : Способ оплаты
	- `address: string` : Адрес доставки
	- `phone: string` : Телефон
	- `email: string` : Электронная почта
    - `items: string[]` : Список заказанных товаров
    - `total: number` : Сумма заказа
- `IOrderFieldData` : Описывает структуру полей заказа. Включает информацию о способе оплаты, адресе доставки, электронной почте, номере телефона.
- `IOrderForm` : Используется для определения полей формы заказа. Включает в себя поля, связанные с процессом оформления заказа, такие как адрес доставки и способ оплаты.
    - `payment: string` : Адрес доставки.
    - `address: string` : Способ оплаты.
- `IContactForm` : Определяет поля для формы контактных данных пользователя. Включает такие поля, как электронная почта и номер телефона.
    - `phone: string` : Электронная почта.
    - `email: string` : Номер телефона.
- `FormErrors` : Представляет собой структуру для хранения ошибок валидации формы. Это может быть объект с ключами, соответствующими именами полей формы, и значениями, представляющими текст ошибок.
- `IProduct` : Описывает структуру данных товара. Он включает в себя идентификатор, название, описание, цену, категорию и ссылку на изображение товара.
    - `id: string` : Идентификатор товара.
    - `title: string` : Название товара.
    - `description: string` : Описание товара.
    - `price: number | null` : Цена товара.
    - `category: string` : Категория товара.
    - `image: string` : Ссылка на изображение товара.


### API

#### 1.`Api`

##### Структура и назначение
Класс `Api` является базовым классом для взаимодействия с сервером. Он отвечает за отправку HTTP-запросов и обработку ответов от сервера. Реализует базовые HTTP-методы, такие как: `GET`, `POST`, `PUT`, `DELETE`. 

Свойства :  
- `baseUrl(string)` : Основной URL для запросов к API.
- `options(RequestInit)` : Базовые опции запроса.
##### Конструктор
`constructor(baseUrl: string, options: RequestInit)` - Инициализирует класс с указанным базовым URL и опциями запросов.
##### Методы
- `get<T>(uri: string): Promise<object>` : Выполняет GET-запрос к указанному URI. Возвращает промис с типизированным ответом от сервера.
- `post<T>(uri: string, data: object, method: ApiPostMethods): Promise<object>` : Выполняет запрос типа `method` с данными  `data` по указанному URI. Возвращает промис с типизированным ответом от сервера.
##### Типы данных
- `ApiPostMethods` : Тип, описывающий допустимые методы HTTP-запросов для операций, кроме `GET`.
- `ApiListResponse<T>` : Тип ответа от API, содержащий список, где `T` представляет ожидаемый формат данных ответа. Это позволяет легко адаптировать класс Api для работы с различными структурами данных.

#### 2. `ShopAPI`

##### Структура и назначение
`ShopAPI` расширяет базовый класс `Api`, предоставляя спецефические методы для работы с API магазина. Он обеспечивает функциональность для получения списка товаров, детальной информации о товарах и оформления заказов. 
##### Конструктор
`constructor(baseUrl: string, protected cdnUrl: string, options: RequestInit)` - Устанавливает базовый URL для API и возможные опции для запросов.
##### Свойства 
- `cdnUrl: string` : Базовый урл для изображений
##### Методы
- `getProductList(): Promise<IProduct[]>` : Получение списка всех товаров с сервера.
- `getProduct(id: string): Promise<IProduct>` : Получение детальной информации о товаре по его ID.
- `setOrder(order: IOrder): Promise<IOrderResult>` : Отправка информации о заказе на сервер и получение результата.
##### Типы данных
- `IProduct` : Интерфейс для структуры данных товара.
    - `id: string` : Идентификатор товара.
    - `title: string` : Название товара.
    - `description: string` : Описание товара.
    - `price: number | null` : Цена товара.
    - `category: string` : Категория товара.
    - `image: string` : Ссылка на изображение товара.
- `IOrder` : Интерфейс для структуры данных заказа.
	- `payment: string` : Способ оплаты
	- `address: string` : Адрес доставки
	- `phone: string` : Телефон
	- `email: string` : Электронная почта
    - `items: string[]` : Список заказанных товаров
    - `total: number` : Сумма заказа.
- `IOrderResult` : Интерфейс для структуры данных результата заказа.
    - `id: string` : Идентификатор заказа.
    - `total: number` : Итоговая цена.

### Слушатель событий
#### 1. `EventEmitter`

#### Структура и назначение
 Класс, который функционирует как центральный брокер событий в проекте. Позволяет компонентам подписываться на события и реагировать на них.

Свойства:  
- `_events: Map<EventName, Set<Subscriber>>` : приватное свойство, хранящее множество подписчиков для каждого события.
##### Конструктор
`constructor()` - Инициализирует объект класса.
##### Методы
- `on<T extends object>(eventName: EventName, callback: (event: T) => void)` : Подписывает обработчик на определенное событие. Если событие еще не существует в '_events', оно инициализируется.
- `off(eventName: EventName, callback: Subscriber)` : Снимает подписку на определенное событие.
- `emit<T extends object>(eventName: string, data?: T)` :  Генерирует событие с указанным именем и опциональными данными. Вызывает все подписанные на это событие обработчики, передавая им данные.
- `onAll(callback: (event: EmitterEvent)` : Подсписывает обработчик на все возможные события
- `offAll()` : Отписывает обработчик от всех возможных событий
##### Типы данных
- `EventName` : Имя события.
- `Subscriber` : Тип функции-обработчика события.
- `IEvents` : Интерейс с описанием методов обработчика событий.
   - `on<T extends object>(event: EventName, callback: (data: T) => void): void;` : Используется для подписки на событие. Строка `event`, представляющая имя события. Функция `callback`, которая будет вызвана при срабатывании события. 
   - `emit<T extends object>(event: string, data?: T): void;` : Используется для вызова события. Строка `event`, представляющая имя события. Объект `data`, представляющий данные, связанные с событием
   - `trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;` : Метод похож на `emit`, но он возвращает функцию, которая может быть вызвана для вызова события с определенными данными. Строка `event`, представляющая имя события. Объект `context`, представляющий контекст, связанный с событием.


### Компоненты отображения

#### 1. `Component<T>`

##### Структура и назначение
Класс `Component` является абстрактным базовым классом для всех компонентов пользовательского интерфейса в проекте. Он представляет общий функционал для работы с DOM-элементами и управления их поведением и внешним видом.   
##### Конструктор
`constructor(container: HTMLElement)` - Инициализация компонента с заданным контейнером.
##### Методы
- `toggleClass(element: HTMLElement, className: string, force?: boolean)` : Переключает класс у элемента. Выводит предупреждение, если элемент не найден.
- `setText(element: HTMLElement, value: unknown)` : Устанавливает текстовое содержимое элемента. Выводит предупреждение, если элемент не найден.
- `setDisabled(element: HTMLElement, state: boolean)` : Устанавливает или удаляет атрибут 'disabled'. Выводит предупреждение, если элемент не найден.
- `setHidden(element: HTMLElement)` : Скрывает элемент (display: none). Выводит предупреждение, если элемент не найден.
- `setVisible(element: HTMLElement)` : Делает элемент видимым. Выводит предупреждение, если элемент не найден.
- `setImage(element: HTMLImageElement, src: string, alt?: string)` : Устанавливает изображение и альтернативный текст для <img>. Выводит предупреждение, если элемент не найден.
- `render(data?: Partial<T>)` : Обновляет состояние компонента с помощью переданных данных и возвращает его контейнер.


#### 2. `Modal` 

##### Структура и назначение
Класс `Modal` управляет поведением модальных окон в приложении. Этот компонент отвечает за открытие, закрытие и отображение контента в модальном окне. Он наследуется от базового класса `Component`, расширяя его функциональность для работы с модальными окнами.
- `_closeButton: HTMLButtonElement` : Кнопка для закрытия модального окна.
- `_content: HTMLElement` : Элемент для содержимого модального окна.
##### Конструктор
`constructor(container: HTMLElement, events: IEvents)` - Инициализирует элементы управления модального окна.
##### Методы
- `set content(value: HTMLElement)` : Устанавливает содержимое модального окна.
- `open(): void` : Метод для открытия модального окна. Добавляет класс активности к контейнеру модального окна и инициирует событие открытия.
- `close(): void` : Метод для закрытия модального окна. Удаляет класс активности и очищает содержимое модального окна. Инициирует событие закрытия.
- `render(data: IModalData): HTMLElement` : Метод для отображения модального окна. 
##### Типы данных
- `IModalData` : Тип данных, представляющий информацию, необходимую для отображения в модальном окне.
    - `content: HTMLElement` : Информация необходимая для отображения.


#### 3. `Form<T>`

##### Структура и назначение
Класс `Form` расширяет базовый компонент `Component`, предоставляя функционал для управления формами в проекте. Этот класс облегчает обработку ввода данных пользователем и управление состоянием формы, включая отображение ошибок валидации.   

Свойства:
- `_submit: HTMLButtonElement` : Кнопка отправки формы.
- `_errors: HTMLElement` : Элемент для отображения ошибок формы.
##### Конструктор
`constructor(container: HTMLFormElement, events: IEvents)` - Инициализирует элементы управления формы и подписывается на события ввода и отправки формы.
##### Методы
- `onInputChange(field: keyof T, value: string): void` : Вызывается при изменении значений полей формы. Вызывает событие изменения поля с новым значением.
- `set valid(value: boolean)` : Устанавливает состояние валидности формы. Если форма валидна, кнопка отправки активируется, иначе она деактивируется.
- `set errors(value: string)` : Устанавливает текст ошибок формы. Если есть ошибки, они отображаются в предназначенном для этого элементе.
- `render(state: Partial<T> & IFormState): HTMLElement` : Отображает форму с новым состоянием, обновляя валидность и ошибки.
##### Типы данных
- `IFormState` : Тип данных, представляющий состояние формы, включая валидность и ошибки.
    - `valid: boolean` : Валидность формы.
    - `errors: string[]` : Массив ошибок.
- `T` : Дженерик, представляющий структуру данных полей формы.


#### 4. `Basket`

##### Структура и назначение
`Basket` является компонентом пользовательского интерфейса, который управляет отображением корзины на странице. Он наследуется от базового класса `Component` и использует методы для управления состоянием корзины, включая список товаров, их общую стоимость и логику активации кнопки оформления заказа.   

Свойства :   
- `_list: HTMLElement` : Элемент со списком товаров в корзине.
- `_total: HTMLElement` : Элемент для отображения общей стоимости товаров.
- `_button: HTMLButtonElement` : Кнопка для перехода к оформлению заказа.
##### Конструктор
`constructor(container: HTMLElement, events: IEvents)` - Инициализирует элементы управления корзины и подписывается на события.
##### Методы
- `set items(items: Map<string, number>): void` : Устанавливает элементы корзины. Показывает сообщение "Корзина пуста", если список товаров пуст.
- `set total(total: number): void` : Устанавливает и отображает общую стоимость товаров в корзине.
- `get total(total: number): void` : Возвращает общую стоимость товаров в корзине.
##### Типы данных
- `IBasket` : Интерфейс, описывающий структуру данных, используемых для отображения корзины.
    - `items: Map<string, number>` : Список довабленный в корзину товаров.


#### 5. `Card<T>`

##### Структура и назначение
`Card` является компонентом пользовательского интерфейса, который управляет отображением данных товара на странице. Он наследуется от базового класса `Component` и использует методы для управления состоянием товара.
Свойства :   

- `_title: HTMLElement;` : Элемент с названием товара
- `_price: HTMLElement;` : Элемент с ценой товара
- `_category?: HTMLElement;` : Элемент с категорией товара
- `_image?: HTMLImageElement;` : Элемент с изображением товара
- `_button: HTMLButtonElement;` : Элемент кнопки действия с товаром
##### Конструктор
`constructor(protected blockName: string, container: HTMLElement, actions?: IActions)` - Инициализирует элементы карточки товара.
##### Методы
- `set title(value: string)` : Уставливает и отображет название товара
- `set price(value: number | null)` : Уставливает и отображет стоимость товара, если стоимость отсутствует, то устанавливает значение "Бесценно"
- `set category(value: string)` : Уставливает и отображет категорию товара, а также устанавливает класс элемента отображения категории для различной цветовой индикации
- `set image(value: string)` : Уставливает и отображет изображение товара
##### Типы данных
- `IActions` : Интерфейс, описывающий возможные действия. Ключами объекта, имплементирующего интерфейс, являются события для слушателей `addEventListener`
    - `click?: (e: Event)` : Событие, описывающее действие при клике на выбранный элемент
- `T` : Дженерик, представляющий структуру данных модели товара.

#### 6. `CatalogItem`

##### Структура и назначение
Класс `CatalogItem` расширяет `Card` для представления карточки товара в каталоге. Он управляет отображением информации о товаре, включая название, описание, цену и изображение.   
##### Конструктор
`constructor(container: HTMLElement, actions?: IActions)` - Инициализирует элементы карточки и устанавливает обработчики событий для кнопок.
##### Типы данных
- `IProduct` : Интерфейс описывающий товар, связанный с этой карточкой.
    - `id: string` : Идентификатор товара.
    - `title: string` : Название товара.
    - `description: string` : Описание товара.
    - `price: number | null` : Цена товара.
    - `category: string` : Категория товара.
    - `image: string` : Ссылка на изображение товара.

#### 7. `BasketItem`

##### Структура и назначение
Класс `BasketItem` расширяет `Card` для представления карточки товара в корзине. Он управляет отображением информации о товаре, включая название, описание, цену, изображение и позицию в корзине.   
##### Конструктор
`constructor(container: HTMLElement, actions?: IActions)` - Инициализирует элементы карточки и устанавливает обработчики событий для кнопок.
##### Свойства
- `protected _index: HTMLElement` - элемент позиции товара в корзине
##### Методы
- `set index(value: number)` - Устанавливает и отображает позицию товара в корзине
##### Типы данных
- `IActions` : Интерфейс, описывающий возможные действия. Ключами объекта, имплементирующего интерфейс, являются события для слушателей `addEventListener`
- `IBasketItem` : Интерфейс, описывающий данные товара в корзине. Расширяет интерфейс `IProduct`, добавляя свойство
    - `index: number`

#### 8. `ProductView`

##### Структура и назначение
Класс `ProductView` расширяет `Card` для представления карточки товара в окне детальной информации о товаре. Он управляет отображением информации о товаре, включая название, описание, цену, изображение.   
##### Конструктор
`constructor(container: HTMLElement, actions?: IActions)` - Инициализирует элементы карточки и устанавливает обработчики событий для кнопок.
##### Свойства
- `_description: HTMLElement` - элемент, содержащий текст описания товара
##### Методы
- `set description(value: string)` - Устанавливает и отображает описание товара
- `set price(value: number | null)` - Дополняет родительскую функцию установки и отображения цены товара, блокируя кнопку добавления в корзину в случае, если у товара отсуствует цена
##### Типы данных
- `IActions` : Интерфейс, описывающий возможные действия. Ключами объекта, имплементирующего интерфейс, являются события для слушателей `addEventListener`

#### 9. `OrderForm`

##### Структура и назначение
Класс `OrderForm` наследует функциональность от базового класса `Form` и расширяет её, предоставляя специализированные возможности для управления формой заказа. Класс включает в себя элементы управления для выбора способа оплаты и ввода адреса доставки. 
##### Конструктор
`constructor(container: HTMLFormElement, events: IEvents)` - Инициализирует элементы управления формы и устанавливает обработчики событий.
##### Методы
- `set payment(value: string)` : Переключает активное состояние кнопок способа оплаты.
- `set address(value: string)` : Устанавливает значение в поле адреса доставки.
##### Типы данных
- `IOrderForm` : Интерфейс, описывающий структуру данных для формы заказа.
    - `payment: string` : Способ оплаты.
    - `address: string` : Адрес доставки.


#### 10. `ContactForm`

##### Структура и назначение
`ContactForm` является расширением базового класса `Form`, предназначенным для управления формой контактных данных пользователя. Включает поля для ввода телефона и электронной почты.   
##### Конструктор
`constructor(container: HTMLFormElement, events: IEvents)` - Инициализирует форму контактных данных.
##### Методы
- `set phone(value: string)` : Устанавливает значение в поле телефона.
- `set email(value: string)` : Устанавливает значение в поле имейл.
##### Типы данных
- `IContactForm` : Интерфейс, описывающий структуру данных для формы контактов.
    - `phone: string` : Телефон.
    - `email: string` : Имейл.


#### 11. `Page`

##### Структура и назначение
Класс `Page` управляет основными элементами интерфейса страницы, включая счетчик корзины, каталог товаров и обертку страницы. Данный клас расширяет базовый класс `Component`.

Свойства :    
- `_counter: HTMLElement` : Элемент счетчика корзины.
- `_catalog: HTMLElement` : Контейнер для элементов каталога товаров.
- `_wrapper: HTMLElement` : Обертка страницы.
- `_basket: HTMLButtonElement` : Элемент кнопки корзины.
##### Конструктор
`constructor(container: HTMLElement, events: IEvents)` - Инициализирует элементы страницы и назначает обработчики событий.
##### Методы
- `set counter(value: number)` : Обновляет счетчик товаров в корзине.
- `set catalog(items: HTMLElement[])` : Заполняет каталог товаров.
- `set locked(value: boolean)` : Управляет блокировкой скролла страницы.
##### Типы данных
- `IPage` : Интерфейс, описывающий структуру данных для компонента.
    - `counter: number` : Количество товаров в корзине.
    - `catalog: HTMLElement[]` : Список элементов товаров в каталоге.
    - `locked: boolean` : Флаг блокировки скролла страницы.


#### 12. `Success`

##### Структура и назначение
`Success` расширяет базовый класс `Component` и управляет отображением сообщения об успешном выполнении операции, например, после оформления заказа.   

Свойства :   
- `_close: HTMLButtonElement` : Кнопка для закрытия сообщения об успехе.
- `_total: HTMLElement` : Элемент для отображения информации о списанных средствах.
##### Конструктор
`constructor(container: HTMLElement, actions?: IActions)` - Bнициализирует элементы интерфейса и назначает обработчики событий.
##### Методы
- `set total(value: string)` : Устанавливает текст, отображаемый в элементе `_total`. Используется для обновления информации о стоимости или других данных, связанных с успешным завершением операции.
##### Типы данных
- `ISuccess` : Интерфейс, описывающий структуру данных для компонента.
    - `total: number` : Итоговая сумма за товары.


