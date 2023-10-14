import { MenuItem } from './components/menu/MainMenu';
import { Map } from './modules/Map';
import { MainMenu } from './modules/MainMenu';
import { useState } from 'react';

const menuItems: MenuItem[] = [
  {
    name: 'Кредиты',
    subItems: [
      { name: 'Кредит наличными' },
      { name: 'Экспресс кредит' },
      { name: 'Рефинансирование' },
    ],
  },
  {
    name: 'Вклады',
    subItems: [{ name: 'Рассчитать кредит' }, { name: 'Кредит наличными' }],
  },
  {
    name: 'Карты',
    subItems: [
      { name: 'Дебетовые карты' },
      { name: 'Кредитные карты' },
      { name: 'Пенсионные карты' },
      { name: 'Карты жителя' },
    ],
  },
  { name: 'Ипотека', subItems: [] },
  {
    name: 'Автокредиты',
    subItems: [
      { name: 'Автокредит наличными' },
      { name: 'Автокредит в автосалоне' },
    ],
  },
  { name: 'Вклады и счета', subItems: [] },
  { name: 'Инвестиции', subItems: [] },
  { name: 'Платежи и переводы', subItems: [{ name: 'Оплата услуг' }] },
  {
    name: 'Другие услуги',
    subItems: [
      { name: 'Страховые и сервисные продукты' },
      { name: 'Аренда сейфовых ячеек' },
      { name: 'Банкротство физических лиц' },
    ],
  },
  {
    name: 'Валюта и золото',
    subItems: [
      { name: 'Купить валюту' },
      { name: 'Продать валюту' },
      { name: 'Купить золото' },
    ],
  },
];

function App() {
  const [distances, setDistances] = useState<number[]>([]);

  const distancesHandler = (distances: number[]) => {
    setDistances([...distances]);
  };

  // TODO: Переименовать Сережин компонент MainMenu. Изменить структуру проекта (Распихать по components, modules и тд, шрифты, иконки раскидать)

  return (
    <>
      {/* <MainMenu menuItems={menuItems} /> */}
      <MainMenu distances={distances} />
      <Map distancesHandler={distancesHandler} />
    </>
  );
}

export default App;
