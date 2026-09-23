export default function TaskToolbar({
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onResetFilters,
}) {
  return (
    <div className="toolbar" style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
      <label className="searchField" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span style={{ fontSize: '12px', color: '#667085', marginBottom: '4px' }}>Поиск</span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Название или проект"
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #d9deea' }}
        />
      </label>
      <label className="filterField" style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '12px', color: '#667085', marginBottom: '4px' }}>Статус</span>
        <select
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #d9deea' }}
        >
          <option value="Все">Все</option>
          <option value="Нужно сделать">Нужно сделать</option>
          <option value="В работе">В работе</option>
          <option value="Готово">Готово</option>
        </select>
      </label>
      <button
        className="ghostButton"
        type="button"
        onClick={onResetFilters}
        style={{ alignSelf: 'flex-end', padding: '9px 16px' }}
      >
        Сбросить
      </button>
    </div>
  );
}