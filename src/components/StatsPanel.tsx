import React from 'react';
import { useTaskStore } from '../store/taskStore';
import { Layout, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const StatsPanel: React.FC = () => {
  const { tasks } = useTaskStore();
  
  const stats = {
    total: tasks.length,
    new: tasks.filter(t => t.status === 'New').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    done: tasks.filter(t => t.status === 'Done').length,
    overdue: tasks.filter(t => t.status === 'Overdue').length,
  };

  const statItems = [
    { label: 'Усього', value: stats.total, icon: <Layout size={20} />, color: 'var(--accent-primary)' },
    { label: 'Нові', value: stats.new, icon: <Clock size={20} />, color: 'var(--text-secondary)' },
    { label: 'В процесі', value: stats.inProgress, icon: <Clock size={20} />, color: 'var(--accent-warning)' },
    { label: 'Завершені', value: stats.done, icon: <CheckCircle size={20} />, color: 'var(--accent-success)' },
    { label: 'Прострочені', value: stats.overdue, icon: <AlertCircle size={20} />, color: 'var(--accent-danger)' },
  ];

  return (
    <div className="stats-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      {statItems.map((item, idx) => (
        <div key={idx} className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ color: item.color, display: 'flex', alignItems: 'center', gap: '8px' }}>
            {item.icon}
            <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{item.label}</span>
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{item.value}</span>
        </div>
      ))}
    </div>
  );
};
