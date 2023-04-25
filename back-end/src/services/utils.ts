export const formatDate = (date: Date) => {
    const dd = (`0${date.getDate()}`).slice(-2);
    const mm = (`0${date.getMonth() + 1}`).slice(-2);
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };
  
  export const throwValidationError = (message: string = 'Erro de validação') => {
    const err = new Error(message);
    err.name = 'ValidationError';
    throw err;
  };
  
  export const throwConflictError = (message: string = 'Conflict') => {
    const err = new Error(message);
    err.name = 'Conflict';
    throw err;
  };
  
  export const throwUnauthorizedError = (message: string = 'Não autorizado') => {
    const err = new Error(message);
    err.name = 'Unauthorized';
    throw err;
  };
  
  export const throwNotFoundError = (message: string = 'Not found') => {
    const err = new Error(message);
    err.name = 'NotFoundError';
    throw err;
  };
  
