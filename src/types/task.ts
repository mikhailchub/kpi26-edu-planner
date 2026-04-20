export type TaskStatus = 'New' | 'In Progress' | 'Done' | 'Overdue';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description?: string;
  subject: string;
  deadline: string; // ISO string
  priority: TaskPriority;
  status: TaskStatus;
  tags: string[];
  estimatedDuration?: number; // minutes
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setStatus: (id: string, status: TaskStatus) => void;
  resetData: () => void;
}
