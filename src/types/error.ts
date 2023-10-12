export interface ErrorRes {
  response: {
    data: {
      error: {
        code: string;
        message: string;
      };
    };
  };
  meta: {
    timer: number;
    timerAvg: number;
  };
}
