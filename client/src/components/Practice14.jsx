import { useState, useRef } from 'react';

const shopCatalog = [
  { id: 'p1', name: 'Лицензия TaskFlow Enterprise', price: 1200 },
  { id: 'p2', name: 'Пакет облачного хранения', price: 450 },
  { id: 'p3', name: 'Модуль AI-ассистента', price: 800 },
];

export default function Practice14() {
  const [mainImage, setMainImage] = useState(
    'https://via.placeholder.com/600x280/4f46e5/ffffff?text=Gallery+Image+1'
  );
  const [selectedIds, setSelectedIds] = useState([]);
  const [thumbLeft, setThumbLeft] = useState(0);
  const [dndCart, setDndCart] = useState([]);

  const sliderRef = useRef(null);
  const animOneRef = useRef(null);
  const animTwoRef = useRef(null);

  const handleContentsClick = (e) => {
    const link = e.target.closest('a');
    if (link) {
      const confirmed = window.confirm(`Вы действительно хотите покинуть страницу и перейти на ${link.href}?`);
      if (!confirmed) {
        e.preventDefault();
      }
    }
  };

  const handleSelectItem = (e, idx) => {
    if (e.ctrlKey || e.metaKey) {
      setSelectedIds((prev) =>
        prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
      );
    } else {
      setSelectedIds([idx]);
    }
  };

  const handleSliderDown = (e) => {
    e.preventDefault();
    const slider = sliderRef.current;
    if (!slider) return;

    const onMouseMove = (moveEvent) => {
      const rect = slider.getBoundingClientRect();
      let nextPos = moveEvent.clientX - rect.left - 12;
      if (nextPos < 0) nextPos = 0;
      const maxPos = slider.offsetWidth - 24;
      if (nextPos > maxPos) nextPos = maxPos;
      setThumbLeft(nextPos);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleDragProduct = (e, product) => {
    e.preventDefault();
    const ghost = e.currentTarget.cloneNode(true);
    ghost.style.position = 'fixed';
    ghost.style.zIndex = 9999;
    ghost.style.pointerEvents = 'none';
    ghost.style.left = `${e.clientX - 50}px`;
    ghost.style.top = `${e.clientY - 20}px`;
    document.body.appendChild(ghost);

    const onMouseMove = (moveEvent) => {
      ghost.style.left = `${moveEvent.clientX - 50}px`;
      ghost.style.top = `${moveEvent.clientY - 20}px`;
    };

    const onMouseUp = (upEvent) => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      const below = document.elementFromPoint(upEvent.clientX, upEvent.clientY);
      ghost.remove();

      if (below && below.closest('#p14-droppable-cart')) {
        setDndCart((prev) => {
          const found = prev.find((item) => item.id === product.id);
          if (found) {
            return prev.map((item) =>
              item.id === product.id ? { ...item, qty: item.qty + 1 } : item
            );
          }
          return [...prev, { ...product, qty: 1 }];
        });
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const runFirstAnimation = () => {
    const box = animOneRef.current;
    if (!box) return;
    const start = performance.now();
    const step = (now) => {
      let progress = (now - start) / 1000;
      if (progress > 1) progress = 1;
      const offset = Math.sin(progress * Math.PI) * 160;
      box.style.transform = `translateX(${offset}px)`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const runSecondAnimation = () => {
    const box = animTwoRef.current;
    if (!box) return;
    const start = performance.now();
    const step = (now) => {
      let progress = (now - start) / 1200;
      if (progress > 1) progress = 1;
      const angle = progress * 360;
      const scale = 1 + Math.sin(progress * Math.PI) * 0.35;
      box.style.transform = `rotate(${angle}deg) scale(${scale})`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const dndTotal = dndCart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <section className="panel practice-block" style={{ marginTop: '24px' }}>
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">Практика 14</p>
          <h2>События мыши, Делегирование, Галерея, Слайдер, Drag-and-Drop и JS-анимации</h2>
        </div>
      </div>

      <div id="contents" onClick={handleContentsClick} style={{ marginBottom: '18px' }}>
        <strong>1. Подтверждение перехода по ссылке (#contents): </strong>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <i>Перейти на официальный сайт Vite</i>
        </a>
      </div>

      <div className="p14-gallery" style={{ marginBottom: '18px' }}>
        <strong>2. Галерея изображений:</strong>
        <img src={mainImage} alt="Main view" className="p14-main-img" style={{ marginTop: '8px' }} />
        <div className="p14-thumbs">
          {[1, 2, 3, 4].map((n) => {
            const imgUrl = `https://via.placeholder.com/600x280/4f46e5/ffffff?text=Gallery+Image+${n}`;
            return (
              <img
                key={n}
                src={imgUrl}
                alt={`Thumb ${n}`}
                onClick={() => setMainImage(imgUrl)}
              />
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: '18px' }}>
        <strong>3. Выделяемый список (клик или Ctrl/Cmd + клик):</strong>
        <ul className="selectable-list" onMouseDown={(e) => e.preventDefault()}>
          {['Архитектура_проекта.pdf', 'Отчет_по_практике.docx', 'Скрипты_сборки.js', 'Схема_БД.png'].map(
            (name, idx) => (
              <li
                key={name}
                className={selectedIds.includes(idx) ? 'selected' : ''}
                onClick={(e) => handleSelectItem(e, idx)}
              >
                {name}
              </li>
            )
          )}
        </ul>
      </div>

      <div style={{ marginBottom: '18px' }}>
        <strong>4. Слайдер (удерживайте бегунок и двигайте мышь):</strong>
        <div ref={sliderRef} className="custom-slider">
          <div
            className="custom-thumb"
            style={{ left: `${thumbLeft}px` }}
            onMouseDown={handleSliderDown}
          />
        </div>
      </div>

      <div style={{ marginBottom: '18px' }}>
        <strong>5. Перетаскивание товаров в корзину (Drag-and-Drop):</strong>
        <div className="dnd-shop" style={{ marginTop: '8px' }}>
          {shopCatalog.map((prod) => (
            <span
              key={prod.id}
              className="draggable-prod"
              onMouseDown={(e) => handleDragProduct(e, prod)}
            >
              {prod.name} ({prod.price} ₽)
            </span>
          ))}
        </div>
        <div id="p14-droppable-cart" className="cart-zone">
          <h4>Корзина Drag-and-Drop (Итого: {dndTotal} ₽)</h4>
          {dndCart.length > 0 ? (
            dndCart.map((item) => (
              <div key={item.id} className="cart-row">
                <span>{item.name}</span>
                <strong>{item.qty} шт. × {item.price} ₽ = {item.qty * item.price} ₽</strong>
              </div>
            ))
          ) : (
            <p style={{ color: '#667085', margin: 0 }}>Перетащите сюда любой товар сверху</p>
          )}
        </div>
      </div>

      <div>
        <strong>6. Две различные JavaScript-анимации (requestAnimationFrame):</strong>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginTop: '10px' }}>
          <button type="button" className="primaryButton" onClick={runFirstAnimation}>
            Анимация 1 (Смещение)
          </button>
          <div ref={animOneRef} className="js-anim-target">Блок 1</div>

          <button type="button" className="ghostButton" onClick={runSecondAnimation}>
            Анимация 2 (Вращение и Масштаб)
          </button>
          <div ref={animTwoRef} className="js-anim-target" style={{ background: '#4f46e5' }}>
            Блок 2
          </div>
        </div>
      </div>
    </section>
  );
}
