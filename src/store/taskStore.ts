import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Task, type TaskStore } from '../types/task';

const DEMO_DATA: Task[] = [
  {
    id: '1',
    title: 'Підготувати опис архітектури',
    description: 'Скласти SDR документи згідно з шаблоном.',
    subject: 'Інженерія ПЗ',
    deadline: new Date(Date.now() + 86400000).toISOString(), // +1 day
    priority: 'High',
    status: 'In Progress',
    tags: ['архітектура', 'SDR'],
    estimatedDuration: 60,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Вивчити React Hooks',
    description: 'Опрацювати useState, useEffect, useContext.',
    subject: 'Веб-технології',
    deadline: new Date(Date.now() - 86400000).toISOString(), // -1 day (Overdue)
    priority: 'Medium',
    status: 'New',
    tags: ['React', 'навчання'],
    estimatedDuration: 120,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Завершити лабораторну №1',
    description: 'Протестувати та завантажити в Classroom.',
    subject: 'Бази даних',
    deadline: new Date(Date.now() + 172800000).toISOString(), // +2 days
    priority: 'Low',
    status: 'Done',
    tags: ['лабораторна', 'SQL'],
    estimatedDuration: 45,
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: DEMO_DATA,
      theme: 'dark',

      addTask: (taskData) => {
        const now = new Date().toISOString();
        const newTask: Task = {
          ...taskData,
          id: crypto.randomUUID(),
          status: 'New',
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ tasks: [newTask, ...state.tasks] }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        }));
      },

      setStatus: (id, status) => {
        const task = get().tasks.find(t => t.id === id);
        if (!task) return;

        // Validation of state transitions (BR-11)
        if (task.status === 'Done') {
           // Done -> New or In Progress is forbidden according to requirements
           // However, Overdue status is system-managed.
           return;
        }

        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t
          ),
        }));
      },

      resetData: () => {
        set({ tasks: DEMO_DATA });
      },

      toggleTheme: () => {
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }));
      },
    }),
    {
      name: 'edu-planner-storage',
    }
  )
);

// Helper to auto-update Overdue status
export const checkOverdueTasks = () => {
  const { tasks, updateTask } = useTaskStore.getState();
  const now = new Date();
  
  tasks.forEach(task => {
    if (task.status !== 'Done' && task.status !== 'Overdue') {
      if (new Date(task.deadline) < now) {
        updateTask(task.id, { status: 'Overdue' });
      }
    }
  });
};
