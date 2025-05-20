import { CREATED } from '../config/httpStatus.js'
import { shortenUrl } from '../services/urlShortenerService.js'

export async function urlShortenerController(req, res, next) {
  const { originalUrl, customSlug } = req.validatedData

  try {
    const shortUrl = await shortenUrl(originalUrl, customSlug)

    res.status(CREATED).json({
      shortUrl,
    })
  } catch (error) {
    next(error)
  }
}
