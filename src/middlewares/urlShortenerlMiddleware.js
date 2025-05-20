import { z } from 'zod'
import { BAD_REQUEST } from '../config/httpStatus.js'

const shortenSchema = z.object({
  originalUrl: z
    .string()
    .url({ message: 'URL inválida' })
    .refine((url) => url.startsWith('https://'), {
      message: 'A URL deve começar com https://',
    }),
  customSlug: z
    .string()
    .min(3, {
      message: 'A url personalizada deve ter entre 3 a 10 caracteres',
    })
    .max(10, {
      message: 'A url personalizada deve ter entre 3 a 10 caracteres',
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: 'A url personalizada deve conter apenas letras e números',
    })
    .optional(),
})

export function validateUrlRequest(req, res, next) {
  const parsedData = shortenSchema.safeParse(req.body)

  if (!parsedData.success) {
    return res.status(BAD_REQUEST).json({
      errors: parsedData.error.flatten().fieldErrors,
    })
  }

  req.validatedData = parsedData.data

  next()
}
