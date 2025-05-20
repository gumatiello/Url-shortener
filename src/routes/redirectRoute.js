import { Router } from 'express'
import { redirectOriginalUrl } from '../controllers/redirectController.js'
import { validateSlug } from '../middlewares/redirectMiddleware.js'

const route = Router()

route.get('/:slug', validateSlug, redirectOriginalUrl)

export default route
