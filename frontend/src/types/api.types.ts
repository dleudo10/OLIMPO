export type ApiResponse<T> =
  | {
      success: true;
      message: string;
      data: T;
      errors: null;
    }
  | {
      success: false;
      message: string;
      data: null;
      errors: object[];
    };