'use client';

import { SearchIcon } from 'lucide-react';
import { type FC, useEffect, useState } from 'react';

import { useDebounce } from '@/shared/lib/use-debounce';
import { Input } from '@/shared/ui/input';

import { useTodoListStore } from '../model/todo-list-store';

export const TodoSearch: FC = () => {
  const { searchQuery, setSearchQuery } = useTodoListStore();

  const [value, setValue] = useState(searchQuery);

  const debouncedValue = useDebounce(value, 300);

  // Update the global store when the debounced value changes
  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  return (
    <div className="relative flex-1">
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2" />
      <Input
        placeholder="Search todos..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};
