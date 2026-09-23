import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import StatCard from './components/StatCard.jsx';
import TaskCard from './components/TaskCard.jsx';
import TaskToolbar from './components/TaskToolbar.jsx';
import TaskForm from './components/TaskForm.jsx';
import { initialTasks } from './data/tasks.js';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskflow.tasks');
    if (saved) {
      return JSON.parse(saved);
    }
    return initialTasks;
  });

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Все');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('taskflow.tasks', JSON.stringify(tasks));
  }, [tasks]);

  const doneCount = tasks.filter((task) => task.status === 'Готово').length;
  const progressCount = tasks.filter((task) => task.status === 'В работе').length;
  const projectsCount = new Set(tasks.map((task) => task.project)).size;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                          task.project.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'Все' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  function handleSaveTask(taskData) {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...taskData, id: editingTask.id } : t)));
    } else {
      setTasks([{ ...taskData, id: crypto.randomUUID() }, ...tasks]);
    }
    setIsFormOpen(false);
    setEditingTask(null);
  }

  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function handleStatusChange(id, newStatus) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
  }

  function handleEdit(task) {
    setEditingTask(task);
    setIsFormOpen(true);
  }

  function handleResetFilters() {
    setSearch('');
    setStatusFilter('Все');
  }

  return (
    <div className="appShell">
      <Sidebar />
      <main className="content">
        <Header onCreateTask={() => setIsFormOpen(true)} />
        <section className="statsGrid" aria-label="Статистика">
          <StatCard label="Всего задач" value={tasks.length} note="Общее количество" />
          <StatCard label="В работе" value={progressCount} note="Активные" />
          <StatCard label="Готово" value={doneCount} note="Завершенные" />
          <StatCard label="Проектов" value={projectsCount} note="Уникальные проекты" />
        </section>
        <section className="panel">
          <div className="sectionHeading">
            <div>
              <p className="eyebrow">Фокус</p>
              <h2>Мои задачи</h2>
            </div>
          </div>
          <TaskToolbar
            search={search}
            statusFilter={statusFilter}
            onSearchChange={setSearch}
            onStatusFilterChange={setStatusFilter}
            onResetFilters={handleResetFilters}
          />
          <div className="taskList">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </section>
      </main>
      
      {isFormOpen && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}