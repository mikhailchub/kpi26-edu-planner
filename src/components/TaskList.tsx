import React from 'react';
import type { Task } from '../types/task';
import { TaskCard } from './TaskCard';
import { useTaskStore } from '../store/taskStore';
import { ClipboardList } from 'lucide-react';

interface TaskListProps {
  filteredTasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ filteredTasks, onEdit, onDelete }) => {
  const { setStatus } = useTaskStore();

  if (filteredTasks.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <ClipboardList size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
        <p>Задач не знайдено</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
      {filteredTasks.map(task => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onEdit={onEdit} 
          onDelete={onDelete}
          onStatusChange={setStatus}
        />
      ))}
    </div>
  );
};
