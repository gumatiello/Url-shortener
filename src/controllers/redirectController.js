import { getOriginalUrl } from '../services/urlShortenerService.js'

export async function redirectOriginalUrl(req, res) {
  const slug = req.validatedSlug

  try {
    const url = await getOriginalUrl(slug)

    res.redirect(url)
  } catch (e) {
    res.render('notfound', { slug })
  }
}
