export class ApiError extends Error {
  constructor(message, input) {
    super(message)
    this.input = input
  }
}

const longUrlInput = document.getElementById('longUrl')
const customSlugInput = document.getElementById('customSlug')

export async function shortenerApi(longUrl, customSlug) {
  const body = { originalUrl: longUrl }
  if (customSlug) body.customSlug = customSlug

  const response = await fetch('/api/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  if (!response.ok) {
    let error = 'Requisição invalida'
    let input = longUrlInput

    if (data.errors) {
      if (data.errors.originalUrl) {
        error = data.errors.originalUrl[0]
        input = longUrlInput
      } else if (data.errors.customSlug) {
        error = data.errors.customSlug[0]
        input = customSlugInput
      }
    } else if (response.status === 409) {
      error = data.error
      input = customSlugInput
    }

    throw new ApiError(error, input)
  }

  return data
}
