import { Response, Request, NextFunction } from 'express';


const errors: any = {
    ValidationError: 400,
    Unauthorized: 401,
    NotFoundError: 404,
    Conflict: 409,
  };
  
  /**
   * @param {Error} err 
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   * @param {import('express').NextFunction} next 
   */
  const errorHandlerMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    const { name, message } = err;
    console.log(err);
    const status = errors[name];
    if (!status) return res.sendStatus(500);
    res.status(status).json({ message });
  };
  
  export default errorHandlerMiddleware;