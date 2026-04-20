import React from 'react';
import { Search, Filter, SortAsc, XCircle } from 'lucide-react';
import type { TaskStatus, TaskPriority } from '../types/task';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: TaskStatus | 'All';
  setStatusFilter: (status: TaskStatus | 'All') => void;
  priorityFilter: TaskPriority | 'All';
  setPriorityFilter: (priority: TaskPriority | 'All') => void;
  sortBy: 'deadline' | 'priority' | 'createdAt' | 'title';
  setSortBy: (sort: 'deadline' | 'priority' | 'createdAt' | 'title') => void;
  onClearFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery, setSearchQuery,
  statusFilter, setStatusFilter,
  priorityFilter, setPriorityFilter,
  sortBy, setSortBy,
  onClearFilters
}) => {
  return (
    <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Пошук задач..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 10px 10px 40px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--panel-border)',
              borderRadius: 'var(--radius-md)',
              color: 'white',
              outline: 'none'
            }}
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} style={{ color: 'var(--text-secondary)' }} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-md)', color: 'white' }}
          >
            <option value="All">Всі статуси</option>
            <option value="New">Нові</option>
            <option value="In Progress">В процесі</option>
            <option value="Done">Завершені</option>
            <option value="Overdue">Прострочені</option>
          </select>
        </div>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as any)}
          style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-md)', color: 'white' }}
        >
          <option value="All">Всі пріоритети</option>
          <option value="High">Високий</option>
          <option value="Medium">Середній</option>
          <option value="Low">Низький</option>
        </select>

        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SortAsc size={18} style={{ color: 'var(--text-secondary)' }} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-md)', color: 'white' }}
          >
            <option value="deadline">За дедлайном</option>
            <option value="priority">За пріоритетом</option>
            <option value="createdAt">За датою створення</option>
            <option value="title">За назвою</option>
          </select>
        </div>

        {/* Reset Filters */}
        <button className="btn btn-secondary" onClick={onClearFilters}>
          <XCircle size={18} />
          Скинути
        </button>
      </div>
    </div>
  );
};
