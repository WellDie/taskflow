export default function Sidebar() {
  return (
    <aside className="sidebar">
      <input type="checkbox" id="burger-toggle" className="burger-toggle" />
      <div className="brand">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div className="brandMark">T</div>
          <div>
            <strong>TaskFlow</strong>
            <span>student edition</span>
          </div>
        </div>
        <label htmlFor="burger-toggle" className="burger-icon"></label>
      </div>
      <nav className="menu" aria-label="Основная навигация">
        <button className="menuItem active" type="button">Обзор</button>
        <button className="menuItem" type="button">Мои задачи</button>
        <button className="menuItem" type="button">Доска</button>
        <button className="menuItem" type="button">Проекты</button>
      </nav>
      <div className="sidebarNote">
        <strong>Практики 1–14</strong>
        <span>Полный сборник заданий</span>
      </div>
    </aside>
  );
}
