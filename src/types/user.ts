export interface User {
  data: {
    token: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
    profile: {
      id: string;
      createdAt: string;
      updatedAt: string;
      email: string;
      name: string;
      phone: string;
      role: string;
    };
  };
  meta: {
    timer: number;
    timerAvg: number;
  };
}
