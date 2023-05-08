import { Request, Response, NextFunction } from 'express';

const openApiErrorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
}

export {
  openApiErrorHandlerMiddleware
}
