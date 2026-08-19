export type SuccessResponse<T> = {
  success: true;
  data: T;
};

export type FailResponse = {
  success: false;
  message: string;
};

export type ErrorResponse = {
  message: string;
};
