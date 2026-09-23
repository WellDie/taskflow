import express from 'express';
import crypto from 'crypto';

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    title: 'Подготовить макет главной страницы',
    project: 'Учебный проект',
    status: 'В работе',
    priority: 'Высокий',
    dueDate: '2026-09-20',
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    title: 'Разобраться с REST API',
    project: 'Обучение',
    status: 'Нужно сделать',
    priority: 'Средний',
    dueDate: '2026-09-25',
  },
  {
    id: '33333333-3333-4333-8333-333333333333',
    title: 'Проверить запросы к серверу',
    project: 'TaskFlow',
    status: 'Готово',
    priority: 'Низкий',
    dueDate: '2026-09-18',
  }
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/tasks', (req, res) => {
  res.status(200).json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title, project, status, priority, dueDate } = req.body;
  if (!title || !status) {
    return res.status(400).json({ error: 'Не заполнены обязательные поля' });
  }
  
  const newTask = {
    id: crypto.randomUUID(),
    title,
    project: project || '',
    status,
    priority: priority || 'Средний',
    dueDate: dueDate || ''
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Задача не найдена' });
  }
  
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  res.status(200).json(tasks[taskIndex]);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Задача не найдена' });
  }
  
  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`TaskFlow API: http://localhost:${PORT}`);
});