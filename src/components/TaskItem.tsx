import { useState } from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  return (
    <div className="group bg-card rounded-lg p-4 shadow-card hover:shadow-soft transition-all duration-300 border border-border">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className="h-5 w-5 data-[state=checked]:bg-gradient-success data-[state=checked]:border-success"
        />
        
        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <Input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="h-9"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSave}
              className="h-9 w-9 p-0 text-success hover:text-success hover:bg-success/10"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancel}
              className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <span
              className={`flex-1 text-base transition-all ${
                task.completed
                  ? 'line-through text-muted-foreground'
                  : 'text-foreground'
              }`}
            >
              {task.title}
            </span>
            
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(task.id)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground ml-8">
        {new Date(task.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>
    </div>
  );
}
