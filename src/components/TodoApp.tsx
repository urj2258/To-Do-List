import { useState, useMemo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TaskInput } from './TaskInput';
import { TaskItem } from './TaskItem';
import { TaskFilters, FilterType } from './TaskFilters';
import { Task } from '@/types/task';

export function TodoApp() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const counts = useMemo(
    () => ({
      all: tasks.length,
      active: tasks.filter((task) => !task.completed).length,
      completed: tasks.filter((task) => task.completed).length,
    }),
    [tasks]
  );

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <CheckCircle2 className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              TaskMaster
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Organize your life, one task at a time
          </p>
        </div>

        <TaskInput onAdd={addTask} />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <TaskFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />
          
          {counts.all > 0 && (
            <p className="text-sm text-muted-foreground">
              {counts.completed} of {counts.all} tasks completed
            </p>
          )}
        </div>

        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="text-6xl">📝</div>
              <h3 className="text-xl font-semibold text-muted-foreground">
                {filter === 'completed'
                  ? 'No completed tasks yet'
                  : filter === 'active'
                  ? 'No active tasks'
                  : 'No tasks yet'}
              </h3>
              <p className="text-muted-foreground">
                {filter === 'all' ? 'Add your first task above to get started!' : 'Try switching filters'}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
