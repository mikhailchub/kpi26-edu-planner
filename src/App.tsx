import { useState, useEffect, useMemo } from 'react';
import { useTaskStore, checkOverdueTasks } from './store/taskStore';
import { StatsPanel } from './components/StatsPanel';
import { FilterBar } from './components/FilterBar';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import type { Task, TaskPriority, TaskStatus } from './types/task';
import { Plus, RotateCcw } from 'lucide-react';

function App() {
  const { tasks, addTask, updateTask, deleteTask, resetData } = useTaskStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'All'>('All');
  const [sortBy, setSortBy] = useState<'deadline' | 'priority' | 'createdAt' | 'title'>('deadline');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  // Check for overdue tasks every minute
  useEffect(() => {
    checkOverdueTasks();
    const interval = setInterval(checkOverdueTasks, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
        const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        if (sortBy === 'deadline') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        if (sortBy === 'createdAt') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'priority') {
          const weights = { High: 3, Medium: 2, Low: 1 };
          return weights[b.priority] - weights[a.priority];
        }
        return 0;
      });
  }, [tasks, searchQuery, statusFilter, priorityFilter, sortBy]);

  const handleCreateTask = (data: any) => {
    addTask(data);
    setIsFormOpen(false);
  };

  const handleUpdateTask = (data: any) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
      setEditingTask(undefined);
    }
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Ви впевнені, що хочете видалити цю задачу?')) {
      deleteTask(id);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setSortBy('deadline');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', width: '100%' }}>
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '8px', background: 'linear-gradient(to right, #fff, #a0a0a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            EduPlanner
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Ваш персональний помічник у навчанні</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={resetData}>
            <RotateCcw size={20} />
            Скинути дані
          </button>
          <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
            <Plus size={20} />
            Нова задача
          </button>
        </div>
      </header>

      <StatsPanel />

      <FilterBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onClearFilters={clearFilters}
      />

      <main>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Задачі ({filteredTasks.length})</h2>
        </div>
        
        <TaskList 
          filteredTasks={filteredTasks} 
          onEdit={(task) => setEditingTask(task)}
          onDelete={handleDeleteTask}
        />
      </main>

      {(isFormOpen || editingTask) && (
        <TaskForm 
          task={editingTask}
          onSave={editingTask ? handleUpdateTask : handleCreateTask}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTask(undefined);
          }}
        />
      )}

      <footer style={{ marginTop: '60px', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
        <p>© 2026 EduPlanner. Працює локально у вашому браузері.</p>
      </footer>
    </div>
  );
}

export default App;
