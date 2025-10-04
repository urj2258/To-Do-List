import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TaskInputProps {
  onAdd: (title: string) => void;
}

export function TaskInput({ onAdd }: TaskInputProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 h-12 text-base shadow-card transition-all focus:shadow-soft"
      />
      <Button 
        type="submit" 
        size="lg"
        className="h-12 px-6 bg-gradient-primary hover:opacity-90 transition-all shadow-soft hover:shadow-lg"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Task
      </Button>
    </form>
  );
}
