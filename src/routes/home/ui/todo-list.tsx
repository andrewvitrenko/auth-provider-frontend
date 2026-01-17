'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { type FC, useEffect, useRef } from 'react';

import { todoQueries } from '@/entities/todo';
import { ItemGroup } from '@/shared/ui/item';

import { useTodoListStore } from '../model/todo-list-store';
import { Placeholder } from './placeholder';
import { TodoItem } from './todo-item';

export const TodoList: FC = () => {
  const searchQuery = useTodoListStore((state) => state.searchQuery);

  const parentRef = useRef<HTMLDivElement>(null);

  const {
    data: todos = [],
    isLoading: isTodosLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(todoQueries.getList(searchQuery));

  // eslint-disable-next-line react-hooks/refs
  const virtualizer = useWindowVirtualizer({
    count: todos.length,
    estimateSize: () => 62,
    gap: 16,
    // eslint-disable-next-line react-hooks/refs
    scrollMargin: parentRef?.current?.offsetTop ?? 0,
  });

  const virtualizedItems = virtualizer.getVirtualItems();

  useEffect(() => {
    const [lastElement] = virtualizedItems.slice(-1);

    if (!lastElement) return;

    if (
      lastElement.index >= todos.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    todos.length,
    virtualizedItems,
  ]);

  if (isTodosLoading) return <Placeholder />;

  if (todos.length === 0) {
    return (
      <div className="text-muted-foreground py-12 text-center">
        {searchQuery
          ? 'No todos found'
          : 'No todos yet. Create your first one!'}
      </div>
    );
  }

  return (
    <div ref={parentRef}>
      <ItemGroup
        className="relative"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualizedItems.map(({ index, start }) => {
          const todo = todos[index];
          return (
            <TodoItem
              className="absolute top-0 left-0"
              key={todo.id}
              todo={todo}
              data-index={index}
              ref={virtualizer.measureElement}
              style={{
                transform: `translateY(${start - virtualizer.options.scrollMargin}px)`,
              }}
            />
          );
        })}
      </ItemGroup>
    </div>
  );
};
