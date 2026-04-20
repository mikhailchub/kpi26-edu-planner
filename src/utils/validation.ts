import type { TaskPriority } from '../types/task';

export interface ValidationError {
  field: string;
  message: string;
}

export const validateTask = (data: {
  title: string;
  subject: string;
  deadline: string;
  priority: string;
  description?: string;
  tags?: string[];
  estimatedDuration?: number;
}, isNew: boolean = true): ValidationError[] => {
  const errors: ValidationError[] = [];

  // BR-02: Title
  if (!data.title || data.title.trim().length < 3 || data.title.length > 100) {
    errors.push({ field: 'title', message: 'Назва задачі повинна містити від 3 до 100 символів' });
  }

  // BR-04: Subject
  if (!data.subject || data.subject.trim().length < 2 || data.subject.length > 50) {
    errors.push({ field: 'subject', message: 'Поле "Предмет" є обов’язковим (від 2 до 50 символів)' });
  }

  // BR-03: Description
  if (data.description && data.description.length > 500) {
    errors.push({ field: 'description', message: 'Опис не може перевищувати 500 символів' });
  }

  // BR-05: Deadline
  if (!data.deadline) {
    errors.push({ field: 'deadline', message: 'Дедлайн не може бути порожнім' });
  } else if (isNew && new Date(data.deadline) < new Date()) {
    errors.push({ field: 'deadline', message: 'Дедлайн не може бути в минулому' });
  }

  // BR-06: Priority
  const validPriorities: TaskPriority[] = ['Low', 'Medium', 'High'];
  if (!validPriorities.includes(data.priority as TaskPriority)) {
    errors.push({ field: 'priority', message: 'Оберіть один із допустимих пріоритетів' });
  }

  // BR-07: Tags
  if (data.tags) {
    if (data.tags.length > 5) {
      errors.push({ field: 'tags', message: 'Не можна додати більше 5 тегів' });
    }
    const uniqueTags = new Set(data.tags);
    if (uniqueTags.size !== data.tags.length) {
      errors.push({ field: 'tags', message: 'Теги не повинні повторюватися' });
    }
    data.tags.forEach(tag => {
      if (tag.length < 1 || tag.length > 20) {
        errors.push({ field: 'tags', message: 'Один тег повинен містити від 1 до 20 символів' });
      }
    });
  }

  // BR-08: Duration
  if (data.estimatedDuration !== undefined && data.estimatedDuration !== null) {
    if (!Number.isInteger(data.estimatedDuration) || data.estimatedDuration < 15 || data.estimatedDuration > 480) {
      errors.push({ field: 'estimatedDuration', message: 'Тривалість повинна бути цілим числом від 15 до 480 хвилин' });
    }
  }

  return errors;
};
