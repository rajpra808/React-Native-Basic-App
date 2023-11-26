type ResponseStatus = 'success' | 'fail';

// Content
export type Content$Get$Response = {
  sys: any;
  total: number;
  limit: number;
  items: any;
  includes: any;
}

// Counter
export type Counter$Get$Response = {
  value: number;
};

// Auth
export type Auth$Login$Response = {
  status: 'success' | 'fail';
  data: any;
};
