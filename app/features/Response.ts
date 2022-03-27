export class Response {
  success: boolean = false;
  error?: string;
  fieldErrors?: {
    [field: string]: string;
  };
}

export class ContentResponse<T> extends Response {
  data?: T;
}
