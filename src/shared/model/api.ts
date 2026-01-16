export type TError = {
  statusCode: number;
  message: string;
  error: string;
};

export type TPaginatedResponse<T> = {
  data: T[];
  total: number;
};

export type TPaginationParams = {
  page?: number;
  limit?: number;
};
