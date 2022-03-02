export interface apiOptsInterface {
  url?: string;
  method?: string;
  json?: boolean;
  body?: any;
  qs?: Record<string, unknown>;
  headers?: Record<string, unknown>;
  bearer?: string;
  wait?: boolean;
  requestsCount?: number;
}
