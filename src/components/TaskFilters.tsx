import { Button } from '@/components/ui/button';

export type FilterType = 'all' | 'active' | 'completed';

interface TaskFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export function TaskFilters({ currentFilter, onFilterChange, counts }: TaskFiltersProps) {
  const filters: { value: FilterType; label: string; count: number }[] = [
    { value: 'all', label: 'All Tasks', count: counts.all },
    { value: 'active', label: 'Active', count: counts.active },
    { value: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={currentFilter === filter.value ? 'default' : 'outline'}
          onClick={() => onFilterChange(filter.value)}
          className={
            currentFilter === filter.value
              ? 'bg-gradient-primary hover:opacity-90 shadow-soft'
              : 'hover:border-primary hover:text-primary'
          }
        >
          {filter.label}
          <span className="ml-2 px-2 py-0.5 rounded-full bg-background/20 text-xs font-semibold">
            {filter.count}
          </span>
        </Button>
      ))}
    </div>
  );
}
