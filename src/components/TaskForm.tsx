import React, { useState } from 'react';
import type { Task, TaskPriority, TaskStatus } from '../types/task';
import { validateTask, type ValidationError } from '../utils/validation';
import { X, Save, Plus } from 'lucide-react';

interface TaskFormProps {
  task?: Task;
  onSave: (data: any) => void;
  onClose: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    subject: task?.subject || '',
    deadline: task?.deadline ? new Date(task.deadline).toISOString().slice(0, 16) : '',
    priority: task?.priority || 'Medium' as TaskPriority,
    status: task?.status || 'New' as TaskStatus,
    description: task?.description || '',
    tags: task?.tags?.join(', ') || '',
    estimatedDuration: task?.estimatedDuration || '',
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
    const duration = formData.estimatedDuration ? parseInt(formData.estimatedDuration as string) : undefined;

    const validationErrors = validateTask({
      ...formData,
      tags: tagsArray,
      estimatedDuration: duration,
    }, !task);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave({
      ...formData,
      tags: tagsArray,
      estimatedDuration: duration,
      deadline: new Date(formData.deadline).toISOString(),
    });
  };

  const getError = (field: string) => errors.find(e => e.field === field)?.message;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="glass-panel animate-in" style={{ 
        width: '100%', 
        maxWidth: '600px', 
        maxHeight: '90vh', 
        overflowY: 'auto',
        padding: '32px',
        position: 'relative'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', right: '20px', top: '20px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <X size={24} />
        </button>

        <h2 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {task ? <Save size={24} /> : <Plus size={24} />}
          {task ? 'Редагувати задачу' : 'Створити нову задачу'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Title */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Назва *</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})}
              style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${getError('title') ? 'var(--accent-danger)' : 'var(--panel-border)'}`, borderRadius: 'var(--radius-md)', color: 'white' }}
            />
            {getError('title') && <span style={{ color: 'var(--accent-danger)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{getError('title')}</span>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Subject */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Предмет *</label>
              <input 
                type="text" 
                value={formData.subject} 
                onChange={e => setFormData({...formData, subject: e.target.value})}
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${getError('subject') ? 'var(--accent-danger)' : 'var(--panel-border)'}`, borderRadius: 'var(--radius-md)', color: 'white' }}
              />
              {getError('subject') && <span style={{ color: 'var(--accent-danger)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{getError('subject')}</span>}
            </div>

            {/* Deadline */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Дедлайн *</label>
              <input 
                type="datetime-local" 
                value={formData.deadline} 
                onChange={e => setFormData({...formData, deadline: e.target.value})}
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${getError('deadline') ? 'var(--accent-danger)' : 'var(--panel-border)'}`, borderRadius: 'var(--radius-md)', color: 'white' }}
              />
              {getError('deadline') && <span style={{ color: 'var(--accent-danger)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{getError('deadline')}</span>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Priority */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Пріоритет *</label>
              <select 
                value={formData.priority} 
                onChange={e => setFormData({...formData, priority: e.target.value as TaskPriority})}
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-md)', color: 'white' }}
              >
                <option value="High">Високий</option>
                <option value="Medium">Середній</option>
                <option value="Low">Низький</option>
              </select>
            </div>

            {/* Status (only for edit) */}
            {task && (
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Статус</label>
                <select 
                  value={formData.status} 
                  onChange={e => setFormData({...formData, status: e.target.value as TaskStatus})}
                  style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-md)', color: 'white' }}
                >
                  <option value="New">Новий</option>
                  <option value="In Progress">В процесі</option>
                  <option value="Done">Завершено</option>
                  <option value="Overdue">Прострочено</option>
                </select>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Опис</label>
            <textarea 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})}
              style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${getError('description') ? 'var(--accent-danger)' : 'var(--panel-border)'}`, borderRadius: 'var(--radius-md)', color: 'white', minHeight: '100px', resize: 'vertical' }}
            />
            {getError('description') && <span style={{ color: 'var(--accent-danger)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{getError('description')}</span>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Tags */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Теги (через кому)</label>
              <input 
                type="text" 
                value={formData.tags} 
                onChange={e => setFormData({...formData, tags: e.target.value})}
                placeholder="навчання, іспит..."
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${getError('tags') ? 'var(--accent-danger)' : 'var(--panel-border)'}`, borderRadius: 'var(--radius-md)', color: 'white' }}
              />
              {getError('tags') && <span style={{ color: 'var(--accent-danger)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{getError('tags')}</span>}
            </div>

            {/* Duration */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Тривалість (хв)</label>
              <input 
                type="number" 
                value={formData.estimatedDuration} 
                onChange={e => setFormData({...formData, estimatedDuration: e.target.value})}
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${getError('estimatedDuration') ? 'var(--accent-danger)' : 'var(--panel-border)'}`, borderRadius: 'var(--radius-md)', color: 'white' }}
              />
              {getError('estimatedDuration') && <span style={{ color: 'var(--accent-danger)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{getError('estimatedDuration')}</span>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              {task ? 'Зберегти зміни' : 'Створити задачу'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Скасувати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
