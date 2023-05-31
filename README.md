# Тестовое задание по курсу Advanced Frontend

![Build Workflow](../../workflows/Build%20project/badge.svg?branch=master)

## Single Page Application для интернет магазина

### Общие Требования

1. Стек JS/CSS - любой.
2. Страница [Списка Товаров](#список-товаров) – список товаров с разбиением по категориям.
3. Страница [Деталей Товара](#детали-товара) - страница с подробным описанием товара.
4. Для проверки на элементы надо добавить `data-test-id`, с помощью которых выполняется поиск
   элементов ([список ниже](#аттрибуты-data-test-id)).

### Дизайн

**100% совпадения с дизайном не требуется и это никак не влияет на оценку качества**

#### [Список Товаров](https://app.moqups.com/HXqhzqVofedbQL8BIseCNOvZ4sgpGrVM/view/page/a4e233e3d)

* логотип _@MyCompany_ не кликабельный;
* товары в 4 категориях, количество товаров в каждой категории может быть разное;
* для каждого товара в категории выводится только фотография, название, цена и описание в 1 строчку (обрезается ...
  в конце);
* при клике на название товара или картинку идет переход на страницу _Деталей Товара_;
* заголовок Категории не кликабельный.

#### [Детали Товара](https://app.moqups.com/HXqhzqVofedbQL8BIseCNOvZ4sgpGrVM/view/page/aca991eac)

* логотип _@MyCompany_ кликабельный и ведет на страницу _Списка Товаров_
* навигация (хлебные крошки):
    * элемент _All products_ кликабельный и ведет на _Список Товаров_;
    * элемент _Product Name_ не кликабельный;
* картинка товара шириной 2/3 экрана;
* справа от картинки товара распологается блок с названием товара, ценой и рейтингом;
* под картинкой товара распологается заголовок Description и под ним полное описание товара.

### API

1. Для backend API магазина нужно использовать [Fake Store API](https://fakestoreapi.com/):
    * [`/products/{id}`](https://fakestoreapi.com/products/1) -> информация по конкретному продукту:
       ```json
       {
         "id": 1,
         "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
         "price": 109.95,
         "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
         "category": "men's clothing",
         "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
         "rating": {
           "rate": 3.9,
           "count": 120
         }
       }
       ```
    * [`/products`](https://fakestoreapi.com/products) -> 20 продуктов.
    * [`/products/categories`](https://fakestoreapi.com/products/categories) -> 4 категории товаров.
    * [`/img/{name}`](https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg) -> картинка продукта.

### Аттрибуты data-test-id

_Пожалуйста, внимательно добавляйте `data-test-id`, так как по этим аттрибутом будет осуществляться автоматическая
проверка качества вашей работы. Аттрибуты статические и не требуют подстановки динамических данных._

1. Страница _Списка Товаров_ должна содержать следующие `data`-аттрибуты:
    * логотип _@MyCompany_ -  `data-test-id="Shop_Logo"`;
    * название магазина -  `data-test-id="Shop_Name"`;
    * название категории - `data-test-id="Category_Name"`;
    * область клика перехода на страницу товара из списка - `data-test-id="List_Item"`.
2. Страница _Детали Товара_ должна содержать следующие `data`-аттрибуты:
    * логотип _@MyCompany_ –  `data-test-id="Shop_Logo"`;
    * название магазина -  `data-test-id="Shop_Name"`;
    * навигация (хлебные крошки):
        * ссылка _All Products_ - `data-test-id="Navigation_All_Products"`;
        * текст с именем товара - `data-test-id="Navigation_Product_Name"`;
    * фотография товара - `data-test-id="Product_Picture"`;
    * название товара - `data-test-id="Product_Name"`;
    * цена товара - `data-test-id="Product_Price"`;
    * рейтинг товара - `data-test-id="Product_Rating"`;
    * текст описания товара - `data-test-id="Product_Description"`;

### Сборка

1. Сборка должна запускать по команде `npm run build`.
2. Резульатат сборки лежит в папке `dist` и имеет как минимум один файл `index.html`.

## Запуск тестов

Для проверки используется Github Actions, шаги сборки описаны в [build.yml](.github/workflows/build.yml).

Для прогона тестов приложение заворачивается в [docker](Dockerfile) и запускается на `localhost:8080`
через [docker compose](docker-compose.yml).

После запускаются UI тесты в `headless` режиме с помощью [puppeteer](https://pptr.dev/). Для локального запуска в
бразуере нужно запусть с флагом `--headless=false`:

```shell
# собираем приложение
$ npm install && npm run build
$ docker compose build
# запускаем в docker (доступно по адресу http://localhost:8080)
$ docker compose up -d
# собираем тесты
$ cd tests
$ npm install
# запускаем тесты в браузере
$ node index.mjs --url=http://localhost:8080 --headless=false
```

## Прием задания

1. Создаете Fork этого репозитория.
2. Сделайте Single Page Application для интернет магазина c 2 страницами как описано выше.
3. После успешного прохождения тестов в _вашем_ репозитории (вкладка `Actions`), создаете Pull Request в основной
   репозиторий (Pull requests -> New pull request), в названии Pull Request указываете **ваше имя**, (например _Романов
   Алексей_).