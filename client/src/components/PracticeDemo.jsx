export default function PracticeDemo() {
  return (
    <section className="panel" style={{ marginTop: '2rem' }}>
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">Практики 4 и 5</p>
          <h2>Новые элементы HTML и Flexbox</h2>
        </div>
      </div>
      
      {/* Практика 4: Форма со всеми требуемыми элементами */}
      <form method="post" action="" className="demo-form">
        <fieldset>
          <legend>Личные данные</legend>
          <label htmlFor="demo-name">Имя (pattern):</label>
          <input type="text" id="demo-name" name="name" pattern="[A-Za-zА-Яа-яЁё\s]+" placeholder="Только буквы" required />

          <label htmlFor="demo-tel">Телефон (tel):</label>
          <input type="tel" id="demo-tel" name="tel" placeholder="+7 000 000 00 00" />

          <label htmlFor="demo-email">Email (email):</label>
          <input type="email" id="demo-email" name="email" required placeholder="mail@example.com" />

          <label htmlFor="demo-pass">Пароль (password):</label>
          <input type="password" id="demo-pass" name="pass" minLength="8" required />

          <label htmlFor="demo-date">Дата встречи (datetime-local):</label>
          <input type="datetime-local" id="demo-date" name="date" min="2026-01-01T00:00" max="2026-12-31T23:59" />

          <label htmlFor="demo-file">Файл (file):</label>
          <input type="file" id="demo-file" name="file" />
        </fieldset>

        <fieldset>
          <legend>Дополнительно</legend>
          <label>Уровень:</label>
          <div className="radio-group">
            <label><input type="radio" name="level" value="junior" /> Junior</label>
            <label><input type="radio" name="level" value="middle" defaultChecked /> Middle</label>
          </div>

          <div className="checkbox-group">
            <label><input type="checkbox" name="agree" required /> Согласен с правилами</label>
          </div>

          <label htmlFor="demo-skills">Навыки (select multiple):</label>
          <select id="demo-skills" name="skills" multiple required size="3">
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="js">JavaScript</option>
          </select>

          <label htmlFor="demo-about">О себе (textarea):</label>
          <textarea id="demo-about" name="about" cols="30" rows="4" minLength="10" maxLength="200" placeholder="Напишите пару слов..."></textarea>
        </fieldset>

        <button type="submit" className="primaryButton">Отправить данные</button>
      </form>

      {/* Практика 4: iframe и video */}
      <div className="media-section" style={{ marginTop: '2rem' }}>
        <h3>Медиа элементы</h3>
        <div className="media-grid">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114111!2d37.525!3d55.741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sru!2sru!4v1" 
            width="100%" height="250" style={{ border: 0 }} allowFullScreen loading="lazy" title="Карта">
          </iframe>
          <video controls width="100%" poster="https://via.placeholder.com/400x250?text=Обложка+Видео">
            <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        </div>
      </div>

      {/* Практика 5: Flexbox адаптивный макет */}
      <div className="flex-layout-demo" style={{ marginTop: '2rem' }}>
        <h3>Адаптивный макет (Сжимается на телефоне)</h3>
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
      </div>
    </section>
  );
}