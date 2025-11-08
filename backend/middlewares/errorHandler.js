import ApiError from '../utils/ApiError.js'; // <-- Note the .js extension

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (!(err instanceof ApiError)) {
    const stack = process.env.NODE_ENV === 'development' ? err.stack : {};
    const apiError = new ApiError(statusCode, message, [], stack);
    statusCode = apiError.statusCode;
    message = apiError.message;
  }

  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message,
    errors: err.errors || [],
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default errorHandler;