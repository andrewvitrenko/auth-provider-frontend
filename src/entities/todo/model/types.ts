import type { Brand } from '@/shared/model/utils';

export type TTodoId = Brand<'todo'>;

export type TTodo = {
  id: TTodoId;
  createdAt: string;
  updatedAt: string;
  title: string;
  completed: boolean;
  completedAt: string | null;
  description: string | null;
};
