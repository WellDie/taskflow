import { useState, useEffect, useRef } from 'react';

export default function Practice13() {
  const fieldRef = useRef(null);
  const imgRef = useRef(null);
  const [imgCoords, setImgCoords] = useState({ left: 0, top: 0 });
  const [clickInfo, setClickInfo] = useState('Кликните внутри поля, чтобы узнать координаты');
  const [imgSize, setImgSize] = useState(40);

  const [messages, setMessages] = useState([
    { id: 1, title: 'Системное сообщение 1', body: 'Проверка делегирования событий закрытия.' },
    { id: 2, title: 'Системное сообщение 2', body: 'Один обработчик на весь родительский контейнер.' },
    { id: 3, title: 'Системное сообщение 3', body: 'Нажмите крестик в правом верхнем углу.' },
  ]);

  const [scrollY, setScrollY] = useState(0);
  const [scrollStage, setScrollStage] = useState('Начало страницы');

  const centerElements = () => {
    if (!fieldRef.current || !imgRef.current) return;
    const field = fieldRef.current;
    const img = imgRef.current;
    const left = (field.clientWidth - img.offsetWidth) / 2;
    const top = (field.clientHeight - img.offsetHeight) / 2;
    setImgCoords({ left, top });
  };

  useEffect(() => {
    centerElements();
    window.addEventListener('resize', centerElements);
    return () => window.removeEventListener('resize', centerElements);
  }, [imgSize]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);
      if (currentY < 400) {
        setScrollStage('Верхняя секция (0–400px)');
      } else if (currentY < 1200) {
        setScrollStage('Средняя секция (400–1200px)');
      } else {
        setScrollStage('Нижняя секция (1200px+)');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFieldClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setClickInfo(`Координаты клика — Внутри поля: X=${x}px, Y=${y}px | Окно: clientX=${e.clientX}px, clientY=${e.clientY}px`);
  };

  const handleContainerDelegation = (e) => {
    const closeBtn = e.target.closest('[data-remove-id]');
    if (!closeBtn) return;
    const id = Number(closeBtn.getAttribute('data-remove-id'));
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <section className="panel practice-block" style={{ marginTop: '24px' }}>
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">Практика 13</p>
          <h2>Размеры, Координаты, Делегирование событий и Параллакс</h2>
        </div>
      </div>

      <div style={{ marginBottom: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span>1. Выберите размер картинки для проверки JS-центрирования:</span>
        {[20, 40, 60].map((size) => (
          <button
            key={size}
            type="button"
            className="ghostButton"
            onClick={() => setImgSize(size)}
          >
            {size}×{size} px
          </button>
        ))}
      </div>

      <div ref={fieldRef} className="coord-area" onClick={handleFieldClick}>
        <img
          ref={imgRef}
          src={`https://via.placeholder.com/${imgSize}x${imgSize}/4f46e5/ffffff?text=JS`}
          alt="Center target"
          style={{
            position: 'absolute',
            width: `${imgSize}px`,
            height: `${imgSize}px`,
            left: `${imgCoords.left}px`,
            top: `${imgCoords.top}px`,
          }}
        />
        <span className="coord-label">{clickInfo}</span>
      </div>

      <div className="notif-box" style={{ marginTop: '16px' }} onClick={handleContainerDelegation}>
        <strong>2. Список уведомлений (удаление через делегирование событий):</strong>
        <div style={{ display: 'grid', gap: '8px', marginTop: '10px' }}>
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                position: 'relative',
                padding: '12px',
                background: 'white',
                border: '1px solid #e4e7ec',
                borderRadius: '8px',
              }}
            >
              <strong>{m.title}</strong>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#667085' }}>{m.body}</p>
              <button
                type="button"
                data-remove-id={m.id}
                className="close-x"
                style={{ position: 'absolute', top: '8px', right: '8px' }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div
        className="parallax-banner"
        style={{
          marginTop: '16px',
          transform: `translateY(${(scrollY % 120) * 0.15}px)`,
        }}
      >
        <strong>3. Эффект параллакса при прокрутке (scrollY: {Math.round(scrollY)}px)</strong>
        <p style={{ margin: '6px 0 0', fontSize: '14px' }}>
          4. Динамическое обновление по скроллу: {scrollStage}
        </p>
      </div>
    </section>
  );
}
