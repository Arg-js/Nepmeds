export const api = {
  login: "user/login",
};

export interface MofinResponse<T = any> {
  data: T;
  status: 0 | 1;
  message: string;
}
