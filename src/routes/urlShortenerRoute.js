import { Router } from 'express'
import { urlShortenerController } from '../controllers/urlShortenerController.js'

const route = Router()

route.post('/', urlShortenerController)

export default route
