export interface apiStatusInterface<T> {
  isLoading: boolean;
  data: T;
  status?: number;
  error?: string;
}
