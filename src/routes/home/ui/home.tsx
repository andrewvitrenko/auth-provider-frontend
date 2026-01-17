import type { FC } from 'react';

import { CreateTodo } from './create-todo';
import { Header } from './header';
import { TodoList } from './todo-list';
import { TodoSearch } from './todo-search';

export const HomePage: FC = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Search and Create Section */}
          <div className="mb-6 flex items-center gap-3">
            <TodoSearch />
            <CreateTodo />
          </div>

          {/* Todo List */}
          <TodoList />
        </div>
      </main>
    </div>
  );
};
