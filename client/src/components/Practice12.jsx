import { useState, useEffect, useRef } from 'react';

export default function Practice12() {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Базовое уведомление #1' },
  ]);
  const [isPaused, setIsPaused] = useState(false);
  const counterRef = useRef(2);
  const [userList, setUserList] = useState(['Первый пункт списка']);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        const nextNum = counterRef.current++;
        setNotifications((prev) => [
          ...prev,
          { id: Date.now(), text: `Авто-уведомление #${nextNum}` },
        ]);
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [isPaused]);

  function createDelayDecorator(fn, delayMs) {
    return function (...args) {
      setIsPaused(true);
      setTimeout(() => {
        fn.apply(this, args);
      }, delayMs);
    };
  }

  const resumeNotifications = createDelayDecorator(() => {
    setIsPaused(false);
  }, 10000);

  const handleCreateList = () => {
    const collected = [];
    while (true) {
      const value = window.prompt('Введите содержимое пункта списка:');
      if (value === null || value === '') break;
      collected.push(value);
    }
    if (collected.length > 0) {
      setUserList((prev) => [...prev, ...collected]);
    }
  };

  function showNotification(options) {
    setPopup(options.html);
    setTimeout(() => {
      setPopup(null);
    }, 1500);
  }

  return (
    <section className="panel practice-block" style={{ marginTop: '24px' }}>
      {popup && <div className="notification floating-notification">{popup}</div>}

      <div className="sectionHeading">
        <div>
          <p className="eyebrow">Практика 12</p>
          <h2>Планирование, Декораторы, DOM и Уведомления</h2>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
        <button
          type="button"
          className="primaryButton"
          onClick={resumeNotifications}
          disabled={isPaused}
        >
          {isPaused ? 'Счетчик остановлен на 10 сек...' : '2. Остановить счетчик уведомлений на 10 сек'}
        </button>

        <button type="button" className="ghostButton" onClick={handleCreateList}>
          3. Создать список через prompt
        </button>

        <button
          type="button"
          className="ghostButton"
          onClick={() => showNotification({ html: '4. Уведомление исчезнет через 1,5 сек!' })}
        >
          4. Вызвать showNotification(options)
        </button>
      </div>

      <div className="notif-box" style={{ marginBottom: '16px' }}>
        <strong>1. Счетчик новых уведомлений ({notifications.length}) — каждые 3 сек:</strong>
        <ul>
          {notifications.map((n) => (
            <li key={n.id}>{n.text}</li>
          ))}
        </ul>
      </div>

      <div className="notif-box">
        <strong>3. Динамический список (HTML-теги обрабатываются как текст):</strong>
        <ul>
          {userList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
