declare global {
  namespace Express {
    interface Request {
      start: number;
    }
  }
}

export {};
