import { useState } from 'react';

const defaultItems = [
  { id: 1, name: 'Подписка Pro', price: 300, qty: 1 },
  { id: 2, name: 'Шаблон Доски', price: 150, qty: 2 },
  { id: 3, name: 'Пакет Иконок', price: 500, qty: 1 },
  { id: 4, name: 'Автоматизация задач', price: 800, qty: 1 },
];

export default function Practice11() {
  const [items, setItems] = useState(defaultItems);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleReplaceOne = () => {
    if (items.length === 0) return;
    const next = [...items];
    next[0] = { id: Date.now(), name: 'Замененный VIP Модуль', price: 450, qty: 1 };
    setItems(next);
  };

  const handleClearAll = () => {
    setItems([]);
  };

  const handleAddItem = () => {
    const title = window.prompt('Введите название нового элемента:', 'Новый плагин');
    if (!title || !title.trim()) return;
    const price = Number(window.prompt('Введите стоимость:', '250')) || 250;
    setItems((prev) => [...prev, { id: Date.now(), name: title.trim(), price, qty: 1 }]);
  };

  const handleDeleteOne = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChangeQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const handleSort = (direction) => {
    const sorted = [...items].sort((a, b) =>
      direction === 'asc' ? a.price - b.price : b.price - a.price
    );
    setItems(sorted);
  };

  function filterRange(arr, a, b) {
    return arr.filter((item) => item.price >= a && item.price <= b);
  }

  const aVal = minPrice === '' ? 0 : Number(minPrice);
  const bVal = maxPrice === '' ? Infinity : Number(maxPrice);
  const displayedItems = filterRange(items, aVal, bVal);

  const totalCost = displayedItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <section className="panel practice-block" style={{ marginTop: '24px' }}>
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">Практика 11</p>
          <h2>Массивы, Методы массивов, Фильтрация и Сортировка</h2>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
        <button type="button" className="ghostButton" onClick={handleReplaceOne}>
          1.1 Заменить 1-й элемент
        </button>
        <button type="button" className="ghostButton" onClick={handleClearAll}>
          1.2 Очистить массив
        </button>
        <button type="button" className="primaryButton" onClick={handleAddItem}>
          + Добавить элемент
        </button>
        <button type="button" className="ghostButton" onClick={() => handleSort('asc')}>
          4. Сортировка по возрастанию ↑
        </button>
        <button type="button" className="ghostButton" onClick={() => handleSort('desc')}>
          4. Сортировка по убыванию ↓
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
        <span>3. Фильтр по цене [a, b]:</span>
        <input
          type="number"
          placeholder="От (a)"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{ width: '120px', padding: '8px', borderRadius: '8px', border: '1px solid #d0d5dd' }}
        />
        <input
          type="number"
          placeholder="До (b)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ width: '120px', padding: '8px', borderRadius: '8px', border: '1px solid #d0d5dd' }}
        />
      </div>

      <div className="cart-zone">
        <h4>Корзина элементов (Итоговая стоимость: {totalCost} ₽)</h4>
        {displayedItems.length > 0 ? (
          displayedItems.map((item) => (
            <div key={item.id} className="cart-row">
              <span>
                <strong>{item.name}</strong> — {item.price} ₽ × {item.qty} шт. = {item.price * item.qty} ₽
              </span>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <button type="button" className="ghostButton" onClick={() => handleChangeQty(item.id, -1)}>
                  -
                </button>
                <span>{item.qty}</span>
                <button type="button" className="ghostButton" onClick={() => handleChangeQty(item.id, 1)}>
                  +
                </button>
                <button
                  type="button"
                  className="ghostButton"
                  onClick={() => handleDeleteOne(item.id)}
                  title="Удалить элемент"
                >
                  🗑
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: '#667085', margin: 0 }}>Массив пуст или нет элементов по фильтру.</p>
        )}
      </div>
    </section>
  );
}
