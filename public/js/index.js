import { openModal } from './modal.js'
import { showErrorMessage } from './inputsMessageErrors.js'
import { ApiError, shortenerApi } from './api.js'

const shortenerForm = document.getElementById('shortenerForm')
const longUrlInput = document.getElementById('longUrl')
const customSlugInput = document.getElementById('customSlug')

shortenerForm.addEventListener('submit', submitForm)

async function submitForm(event) {
  event.preventDefault()

  const longUrl = document.getElementById('longUrl').value
  const customSlug = document.getElementById('customSlug').value

  try {
    const url = new URL(longUrl)

    if (url.protocol !== 'https:') {
      return showErrorMessage(longUrlInput, 'A URL deve usar HTTPS')
    }
  } catch (e) {
    return showErrorMessage(longUrlInput, 'Por favor, insira uma URL válida')
  }

  if (customSlug) {
    if (customSlug.length < 3 || customSlug.length > 10) {
      return showErrorMessage(
        customSlugInput,
        'A url personalizada deve ter entre 3 a 10 caracteres',
      )
    }
    if (!/^[a-zA-Z0-9]+$/.test(customSlug)) {
      return showErrorMessage(
        customSlugInput,
        'A url personalizada deve conter apenas letras e números',
      )
    }
  }

  try {
    const { shortUrl } = await shortenerApi(longUrl, customSlug)

    openModal(shortUrl)
  } catch (error) {
    if (error instanceof ApiError) {
      return showErrorMessage(error.input, error.message)
    }

    return showErrorMessage(longUrlInput, 'Requisição invalida')
  }
}
