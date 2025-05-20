import { CONFLICT, INTERNAL_SERVER_ERROR } from '../config/httpStatus.js'

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.name = 'Api Error'
  }
}

export class ConflictError extends ApiError {
  constructor(message) {
    super(message, CONFLICT)
  }
}

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR
  const error = err.statusCode ? err.message : 'Internal Server Error'

  res.status(statusCode).json({
    error,
  })

  console.error(`Erro: ${err.message}`, {
    statusCode: err.statusCode,
    stack: err.stack,
  })

  next()
}
