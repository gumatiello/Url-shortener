import { FORBIDDEN } from '../config/httpStatus.js'

export function validateOrigin(req, res, next) {
  const origin =
    req.headers.origin || req.headers.referer?.split('/').slice(0, 3).join('/')
  const allowedOrigin = process.env.ORIGIN

  if (!origin || origin !== allowedOrigin) {
    return res.status(FORBIDDEN).json({ error: 'Origem não autorizada' })
  }

  next()
}
