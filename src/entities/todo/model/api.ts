export type TCreateTodoPayload = {
  title: string;
  description?: string;
};

export type TUpdateTodoPayload = {
  title?: string;
  description?: string;
};

export type TToggleTodoPayload = {
  completed: boolean;
};
