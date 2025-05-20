import { customAlphabet } from 'nanoid'
import { pool } from '../database/pool.js'
import { ConflictError } from '../middlewares/errorHandlerMidleware.js'

const alphabet =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const randomSlugLength = 8
const nanoid = customAlphabet(alphabet, randomSlugLength)

export async function shortenUrl(originalUrl, customSlug) {
  let slug = customSlug ?? nanoid()

  const maxAttempts = 5
  let attempts = 0

  while (attempts < maxAttempts) {
    const checkSlugQuery = 'SELECT 1 FROM urls WHERE slug=$1'
    const { rows } = await pool.query(checkSlugQuery, [slug])

    if (rows.length === 0) break

    if (customSlug) {
      throw new ConflictError('A url personalizada ja está em uso.')
    }

    attempts++
    if (attempts >= maxAttempts) {
      throw new ConflictError('Falha ao gerar uma url personalizada.')
    }

    slug = nanoid()
  }

  const insertUrlQuery = 'INSERT INTO urls (original_url, slug) values ($1, $2)'

  await pool.query(insertUrlQuery, [originalUrl, slug])

  const shortUrl = new URL(slug, process.env.ORIGIN).toString()

  return shortUrl
}

export async function getOriginalUrl(slug) {
  const slugQuery = 'SELECT original_url FROM urls WHERE slug=$1 LIMIT 1'

  const { rows } = await pool.query(slugQuery, [slug])

  if (rows.length === 0) {
    throw new Error('Not found url')
  }

  const url = rows[0].original_url

  return url
}
