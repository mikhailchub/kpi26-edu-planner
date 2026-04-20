import React from 'react';
import type { Task } from '../types/task';
import { Calendar, Tag, Clock, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: any) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const isOverdue = task.status === 'Overdue';
  const isHighPriority = task.priority === 'High';
  
  const priorityColor = {
    High: 'var(--priority-high)',
    Medium: 'var(--priority-medium)',
    Low: 'var(--priority-low)',
  }[task.priority];

  const statusColor = {
    New: 'var(--text-secondary)',
    'In Progress': 'var(--accent-warning)',
    Done: 'var(--accent-success)',
    Overdue: 'var(--accent-danger)',
  }[task.status];

  return (
    <div 
      className="glass-panel animate-in" 
      style={{ 
        padding: '20px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px',
        borderLeft: isHighPriority || isOverdue ? `4px solid ${isOverdue ? 'var(--accent-danger)' : priorityColor}` : '1px solid var(--panel-border)',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'default'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>{task.title}</h3>
        <span style={{ 
          fontSize: '0.75rem', 
          padding: '4px 8px', 
          borderRadius: '20px', 
          background: 'rgba(255,255,255,0.05)', 
          color: priorityColor,
          fontWeight: 600,
          border: `1px solid ${priorityColor}44`
        }}>
          {task.priority}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <span style={{ fontWeight: 500, color: 'var(--accent-primary)' }}>{task.subject}</span>
      </div>

      {task.description && (
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {task.description}
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isOverdue ? 'var(--accent-danger)' : 'var(--text-secondary)', fontSize: '0.85rem' }}>
          <Calendar size={14} />
          {format(new Date(task.deadline), 'd MMMM HH:mm', { locale: uk })}
        </div>
        
        {task.estimatedDuration && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <Clock size={14} />
            {task.estimatedDuration} хв
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {task.tags.map((tag, i) => (
          <span key={i} style={{ 
            fontSize: '0.7rem', 
            padding: '2px 8px', 
            borderRadius: '4px', 
            background: 'rgba(255,255,255,0.05)', 
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Tag size={10} />
            {tag}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusColor }}></div>
          <span style={{ fontSize: '0.85rem', fontWeight: 500, color: statusColor }}>{task.status}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {task.status !== 'Done' && (
            <button 
              className="btn btn-secondary" 
              style={{ padding: '6px' }}
              onClick={() => onStatusChange(task.id, 'Done')}
              title="Завершити"
            >
              <CheckCircle2 size={16} color="var(--accent-success)" />
            </button>
          )}
          <button 
            className="btn btn-secondary" 
            style={{ padding: '6px' }}
            onClick={() => onEdit(task)}
          >
            <Edit2 size={16} />
          </button>
          <button 
            className="btn btn-secondary" 
            style={{ padding: '6px' }}
            onClick={() => onDelete(task.id)}
          >
            <Trash2 size={16} color="var(--accent-danger)" />
          </button>
        </div>
      </div>
    </div>
  );
};
