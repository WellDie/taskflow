import { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  project: '',
  status: 'Нужно сделать',
  priority: 'Средний',
  dueDate: '',
};

export default function TaskForm({ task, onSave, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        project: task.project,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
      });
      return;
    }
    setFormData(emptyForm);
  }, [task]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const title = formData.title.trim();
    const project = formData.project.trim();
    if (!title || !project || !formData.dueDate) {
      return;
    }
    onSave({
      ...formData,
      title,
      project,
    });
  }

  return (
    <div className="modalOverlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', padding: '20px' }}>
      <section className="taskFormCard" style={{ background: 'white', padding: '30px', borderRadius: '16px', width: '100%', maxWidth: '500px' }}>
        <div className="formHeading" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <p className="eyebrow">{task ? 'Редактирование' : 'Новая задача'}</p>
            <h2>{task ? 'Изменить задачу' : 'Добавить задачу'}</h2>
          </div>
          <button className="ghostButton" type="button" onClick={onCancel} aria-label="Закрыть форму" style={{ border: 'none', fontSize: '20px' }}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="formGrid" style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
            <label className="field fieldWide" style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', marginBottom: '6px' }}>Название</span>
              <input name="title" value={formData.title} onChange={handleChange} placeholder="Например: подготовить презентацию" autoFocus style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d9deea' }} />
            </label>
            <label className="field fieldWide" style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', marginBottom: '6px' }}>Проект</span>
              <input name="project" value={formData.project} onChange={handleChange} placeholder="Например: Учебный проект" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d9deea' }} />
            </label>
            <label className="field" style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', marginBottom: '6px' }}>Статус</span>
              <select name="status" value={formData.status} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d9deea' }}>
                <option>Нужно сделать</option>
                <option>В работе</option>
                <option>Готово</option>
              </select>
            </label>
            <label className="field" style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', marginBottom: '6px' }}>Приоритет</span>
              <select name="priority" value={formData.priority} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d9deea' }}>
                <option>Низкий</option>
                <option>Средний</option>
                <option>Высокий</option>
              </select>
            </label>
            <label className="field fieldWide" style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', marginBottom: '6px' }}>Срок</span>
              <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d9deea' }} />
            </label>
          </div>
          <div className="formActions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button className="ghostButton" type="button" onClick={onCancel}>Отмена</button>
            <button className="primaryButton" type="submit">{task ? 'Сохранить изменения' : 'Создать задачу'}</button>
          </div>
        </form>
      </section>
    </div>
  );
}