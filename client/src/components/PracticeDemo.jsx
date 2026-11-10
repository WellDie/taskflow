import { useState, useEffect } from 'react';

function isEmpty(obj) {
  for (let key in obj) return false;
  return true;
}

function truncate(str, maxlength) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + '…' : str;
}

function generateTextCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
  let res = '';
  for (let i = 0; i < 5; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

export default function PracticeDemo() {
  const [liked, setLiked] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const [captchaMode, setCaptchaMode] = useState('text');
  const [captchaText, setCaptchaText] = useState(generateTextCaptcha);
  const [mathNums, setMathNums] = useState({ n: 4, m: 5 });
  const [captchaInput, setCaptchaInput] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [accValue, setAccValue] = useState(100);

  useEffect(() => {
    if (!isDrawing) return;
    const handleMouseMove = (e) => {
      const dot = document.createElement('div');
      dot.className = 'draw-trail-dot';
      dot.style.left = `${e.pageX}px`;
      dot.style.top = `${e.pageY}px`;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 800);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDrawing]);

  const handleRegAsk = () => {
    const ans = window.prompt('Желаете пройти регистрацию на сайте?');
    if (ans === 'Да') {
      window.alert('Круто!');
    } else {
      window.alert('Попробуй ещё раз');
    }
  };

  const handleAdminLogin = () => {
    const login = window.prompt('Введите логин:');
    if (login === 'Админ') {
      const pass = window.prompt('Введите пароль:');
      if (pass === 'Я главный') {
        window.alert('Здравствуйте!');
      } else if (pass === null || pass === '') {
        window.alert('Отменено');
      } else {
        window.alert('Неверный пароль');
      }
    } else if (login === null || login === '') {
      window.alert('Отменено');
    } else {
      window.alert('Я вас не знаю');
    }
  };

  const handleCaptchaCheck = (e) => {
    e.preventDefault();
    const inputObj = captchaInput.trim() ? { val: captchaInput.trim() } : {};
    if (isEmpty(inputObj)) {
      window.alert('Поле ввода пустое!');
      return;
    }
    if (captchaMode === 'text') {
      if (captchaInput === captchaText) {
        setIsCaptchaValid(true);
        window.alert('Капча пройдена! Кнопка отправки активна.');
      } else {
        window.alert('Ошибка! Переключаем на математическую капчу.');
        setCaptchaMode('math');
        setMathNums({
          n: Math.floor(Math.random() * 15) + 1,
          m: Math.floor(Math.random() * 15) + 1,
        });
        setCaptchaInput('');
        setIsCaptchaValid(false);
      }
    } else {
      if (Number(captchaInput) === mathNums.n + mathNums.m) {
        setIsCaptchaValid(true);
        window.alert('Капча пройдена! Кнопка отправки активна.');
      } else {
        window.alert('Неверная сумма! Попробуйте снова.');
        setIsCaptchaValid(false);
      }
    }
  };

  const handleAccRead = () => {
    function Accumulator(startingValue) {
      this.value = startingValue;
      this.read = function () {
        const num = window.prompt('Введите число для прибавления:', '50');
        if (num !== null && !Number.isNaN(Number(num))) {
          this.value += Number(num);
        }
      };
    }
    const acc = new Accumulator(accValue);
    acc.read();
    setAccValue(acc.value);
  };

  return (
    <div className="practices-wrapper">
      <section className="panel practice-block">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow">Практика 4</p>
            <h2>Формы, Поля ввода, Iframe и Видео</h2>
          </div>
        </div>
        <form method="post" action="" className="demo-form" onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend>Личные данные</legend>
            <label htmlFor="p4-name">Имя (pattern):</label>
            <input type="text" id="p4-name" name="name" pattern="[A-Za-zА-Яа-яЁё\s]+" placeholder="Только буквы" required />
            <label htmlFor="p4-tel">Телефон (tel):</label>
            <input type="tel" id="p4-tel" name="tel" placeholder="+7 (999) 000-00-00" required />
            <label htmlFor="p4-email">Email (email):</label>
            <input type="email" id="p4-email" name="email" placeholder="user@taskflow.ru" required />
            <label htmlFor="p4-pass">Пароль (password):</label>
            <input type="password" id="p4-pass" name="password" minLength="6" placeholder="Минимум 6 символов" required />
            <label htmlFor="p4-file">Прикрепить файл (file):</label>
            <input type="file" id="p4-file" name="file" />
            <label htmlFor="p4-dt">Дата и время (datetime-local):</label>
            <input type="datetime-local" id="p4-dt" name="dt" min="2026-01-01T00:00" max="2027-12-31T23:59" />
          </fieldset>

          <fieldset>
            <legend>Параметры профиля</legend>
            <div className="radio-group">
              <span>Роль:</span>
              <label><input type="radio" name="role" value="student" defaultChecked /> Студент</label>
              <label><input type="radio" name="role" value="mentor" /> Ментор</label>
            </div>
            <div className="checkbox-group">
              <label><input type="checkbox" name="rules" defaultChecked required /> Согласен с условиями</label>
            </div>
            <label htmlFor="p4-select">Инструменты (multiple select):</label>
            <select id="p4-select" name="tools" multiple size="3" required>
              <option value="react">React</option>
              <option value="node">Node.js</option>
              <option value="git">Git</option>
            </select>
            <label htmlFor="p4-area">О себе (textarea):</label>
            <textarea id="p4-area" name="bio" cols="30" rows="3" minLength="5" maxLength="200" placeholder="Краткая информация..." required></textarea>
          </fieldset>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="submit" value="Отправить (input submit)" className="primaryButton" />
            <button type="button" className="ghostButton">Кнопка (button)</button>
          </div>
        </form>

        <div className="media-grid" style={{ marginTop: '20px' }}>
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=37.6,55.7,37.65,55.77&layer=mapnik"
            width="100%"
            height="240"
            title="Карта"
          ></iframe>
          <video controls width="100%" height="240" poster="https://via.placeholder.com/400x240?text=Video+Preview">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="panel practice-block">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow">Практика 5</p>
            <h2>Flexbox макеты и Адаптивная галерея</h2>
          </div>
        </div>
        <div className="layout-container">
          <div className="box box-a">A</div>
          <div className="layout-row">
            <div className="box box-b">B</div>
            <div className="box box-e">E</div>
          </div>
          <div className="layout-row">
            <div className="box box-c">C</div>
            <div className="box box-d">D</div>
          </div>
        </div>
        <div className="flex-gallery" style={{ marginTop: '16px' }}>
          <img src="https://via.placeholder.com/220x140/4f46e5/ffffff?text=Flex+1" alt="Gallery 1" />
          <img src="https://via.placeholder.com/220x140/3730a3/ffffff?text=Flex+2" alt="Gallery 2" />
          <img src="https://via.placeholder.com/220x140/067647/ffffff?text=Flex+3" alt="Gallery 3" />
          <img src="https://via.placeholder.com/220x140/b54708/ffffff?text=Flex+4" alt="Gallery 4" />
        </div>
      </section>

      <section className="panel practice-block">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow">Практика 6</p>
            <h2>CSS-анимации, переходы и трансформации</h2>
          </div>
        </div>
        <div className="p6-buttons">
          <button type="button" className="anim-btn btn-v1">Кнопка 1</button>
          <button type="button" className="anim-btn btn-v2">Кнопка 2</button>
          <button type="button" className="anim-btn btn-v3">Кнопка 3</button>
          <button type="button" className="anim-btn btn-v4">Кнопка 4</button>
        </div>

        <div className="p6-cards">
          <div className="p6-card">
            <h4>Карточка 1</h4>
            <p>Наведите курсор для трансформации и подъема блока.</p>
          </div>
          <div className="p6-card">
            <h4>Карточка 2</h4>
            <p>Плавный переход с псевдоэлементом ::before.</p>
          </div>
          <div className="p6-card">
            <h4>Карточка 3</h4>
            <p>Эффект тени box-shadow и масштабирования.</p>
          </div>
        </div>

        <div className="p6-video-box">
          <video muted loop autoPlay playsInline width="100%">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          </video>
          <div className="p6-video-caption">
            <h4>Видео с анимацией подписи</h4>
            <p>Оверлей плавно выезжает при наведении курсора.</p>
          </div>
        </div>
      </section>

      <section className="panel practice-block dark-glass-bg">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow" style={{ color: '#a5b4fc' }}>Практика 7</p>
            <h2 style={{ color: 'white' }}>Glassmorphism, Фильтры, calc() и var()</h2>
          </div>
        </div>

        <div className="glass-cards-container">
          <div className="glass-card">
            <h4>Glass 01</h4>
            <p>Эффект матового стекла через backdrop-filter: blur(10px).</p>
          </div>
          <div className="glass-card">
            <h4>Glass 02</h4>
            <p>Соседние карточки размываются при наведении на одну.</p>
          </div>
          <div className="glass-card">
            <h4>Glass 03</h4>
            <p>Анимированные квадраты на фоне через @keyframes.</p>
          </div>
        </div>

        <div className="ray-cards">
          <div className="ray-card"><h5>Лучи 01</h5><p>Анимация границ ::before</p></div>
          <div className="ray-card"><h5>Лучи 02</h5><p>Анимация границ ::before</p></div>
          <div className="ray-card"><h5>Лучи 03</h5><p>Анимация границ ::before</p></div>
        </div>

        <div className="glass-login-box">
          <span className="floating-sq sq-1"></span>
          <span className="floating-sq sq-2"></span>
          <h4>Вход (Glassmorphism)</h4>
          <input type="text" placeholder="Логин" />
          <input type="password" placeholder="Пароль" />
          <button type="button" className="primaryButton">Войти</button>
        </div>

        <div className="social-buttons">
          <button type="button" className="soc-btn">YT</button>
          <button type="button" className="soc-btn">IN</button>
          <button type="button" className="soc-btn">TG</button>
        </div>
      </section>

      <section className="panel practice-block">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow">Практика 8</p>
            <h2>CSS Grid Layout</h2>
          </div>
        </div>

        <div className="semantic-grid-demo">
          <header className="sg-header">header</header>
          <nav className="sg-nav">navigation</nav>
          <aside className="sg-side">sidebar</aside>
          <main className="sg-main">main</main>
          <div className="sg-ads">ads</div>
          <footer className="sg-footer">footer</footer>
        </div>

        <div className="mosaic-grid-7" style={{ marginTop: '20px' }}>
          <div className="m-item m-1">1. Web</div>
          <div className="m-item m-2">2. AI</div>
          <div className="m-item m-3">3. Cloud</div>
          <div className="m-item m-4">4. Dev</div>
          <div className="m-item m-5">5. Data</div>
          <div className="m-item m-6">6. Sec</div>
          <div className="m-item m-7">7. Core</div>
        </div>

        <form className="grid-contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Имя" />
          <input type="text" placeholder="Фамилия" />
          <input type="email" placeholder="Почта" />
          <input type="tel" placeholder="Телефон" />
          <textarea placeholder="Напишите ваше сообщение здесь" rows="2"></textarea>
          <button type="submit" className="primaryButton">Отправить (Grid Form)</button>
        </form>

        <footer className="grid-footer-demo">
          <div><strong>О проекте</strong><p>TaskFlow — учебная система.</p></div>
          <div><strong>Ссылки</strong><p>Задачи / Проекты / Доска</p></div>
          <div><strong>Ресурсы</strong><p>React / Vite / Express</p></div>
          <div><strong>Контакты</strong><p>student@mirea.ru</p></div>
        </footer>
      </section>

      <section className="panel practice-block">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow">Практика 9</p>
            <h2>Основы JavaScript: ветвление и события</h2>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button type="button" className="ghostButton" onClick={handleRegAsk}>
            Пройти регистрацию (if..else)
          </button>
          <button type="button" className="ghostButton" onClick={handleAdminLogin}>
            Вход в панель (prompt Админ)
          </button>
          <button
            type="button"
            className="ghostButton"
            style={{ background: liked ? '#e11d48' : 'white', color: liked ? 'white' : '#344054' }}
            onClick={() => setLiked(!liked)}
          >
            ♥ Нравится {liked ? '(Активно)' : ''}
          </button>
          <button
            type="button"
            className="primaryButton"
            onClick={() => setIsDrawing(!isDrawing)}
          >
            {isDrawing ? 'Остановить рисование за курсором' : 'Рисовать за курсором'}
          </button>
        </div>
      </section>

      <section className="panel practice-block">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow">Практика 10</p>
            <h2>Объекты, Конструктор Accumulator, Строки и Капча</h2>
          </div>
        </div>
        <form onSubmit={handleCaptchaCheck} className="captcha-box">
          <strong>
            {captchaMode === 'text'
              ? `Введите код с картинки: ${captchaText}`
              : `Решите пример: ${mathNums.n} + ${mathNums.m} = ?`}
          </strong>
          <input
            type="text"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            placeholder="Ответ..."
          />
          <button type="submit" className="ghostButton">Проверить капчу</button>
          <button type="button" className="primaryButton" disabled={!isCaptchaValid} onClick={() => window.alert('Форма успешно отправлена!')}>
            Отправить форму
          </button>
        </form>

        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>Сумма в Accumulator: <strong>{accValue} ₽</strong></span>
          <button type="button" className="ghostButton" onClick={handleAccRead}>
            + Прибавить значение (read)
          </button>
        </div>

        <div className="truncate-cards" style={{ marginTop: '16px' }}>
          <div className="statCard">
            <strong>truncate(str, 30)</strong>
            <p>{truncate('Очень длинное описание задачи, которое обязательно нужно усечь троеточием.', 30)}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
