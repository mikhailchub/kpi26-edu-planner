import React from 'react';
import { useTaskStore } from '../store/taskStore';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTaskStore();

  return (
    <button
      className="btn btn-secondary"
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Переключити на світлу тему' : 'Переключити на темну тему'}
      style={{ padding: '10px', minWidth: '44px', justifyContent: 'center' }}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};
