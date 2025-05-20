import { z } from 'zod'

const slugSchema = z
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

export function validateSlug(req, res, next) {
  const parsedData = slugSchema.safeParse(req.params.slug)

  const slug = parsedData.data

  if (!parsedData.success) {
    return res.render('notfound', { slug })
  }

  req.validatedSlug = slug

  next()
}
