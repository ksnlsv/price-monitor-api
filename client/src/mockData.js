export const initialProducts = [
  {
    id: '1',
    title: 'Наушники Sony WH-1000XM5',
    store: 'Ozon',
    url: 'https://ozon.ru/product/sony',
    image: 'https://shop.by/images/sony_1000x_the_collexion_(belyiy)_1.webp',
    currentPrice: 29990,
    oldPrice: 38990,
    discountPercent: 23,
    category: 'Электроника',
    sparkline: [38990, 37500, 35000, 32000, 29990],
    updatedAt: '10 мин назад',
    isTracking: true,
  },
  {
    id: '2',
    title: 'Кофемашина De\'Longhi Magnifica S',
    store: 'Wildberries',
    url: 'https://wildberries.ru/catalog/2',
    image: 'https://delonghi-shop.by/modules/images/delonghi_ec_685_bk_a.jpg',
    currentPrice: 34500,
    oldPrice: 49990,
    discountPercent: 31,
    category: 'Бытовая техника',
    sparkline: [49990, 45000, 42000, 38000, 34500],
    updatedAt: 'час назад',
    isTracking: true,
  },
  {
    id: '3',
    title: 'Смартфон Apple iPhone 15 128GB',
    store: 'Яндекс Маркет',
    url: 'https://market.yandex.ru/product/3',
    currentPrice: 76490,
    oldPrice: 84990,
    discountPercent: 10,
    category: 'Электроника',
    sparkline: [84990, 84990, 81000, 79000, 76490],
    updatedAt: '3 часа назад',
    isTracking: true,
  }
];

export const priceHistoryData = [
  { date: '01 окт', minPrice: 48000 },
  { date: '05 окт', minPrice: 47500 },
  { date: '10 окт', minPrice: 49000 },
  { date: '15 окт', minPrice: 45000 },
  { date: '20 окт', minPrice: 44200 },
  { date: '25 окт', minPrice: 41000 },
  { date: '30 окт', minPrice: 39900 },
];

export const initialNotifications = [
  { id: '1', title: 'Падение цены', description: 'Sony WH-1000XM5 подешевели на 3 000 ₽', time: '10 мин назад', read: false },
  { id: '2', title: 'Новая скидка', description: 'Кофемашина DeLonghi теперь со скидкой 31%', time: '1 час назад', read: false }
];