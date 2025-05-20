const longUrlInput = document.getElementById('longUrl')
const customSlugInput = document.getElementById('customSlug')

export function showErrorMessage(input, message) {
  const messageId = input.getAttribute('aria-describedby')
  const messageElement = document.getElementById(messageId)

  const parentDiv = input.closest('.url-input, .custom-url-input')

  messageElement.textContent = message
  parentDiv.classList.add('invalid')
}

function clearErrorMessage(event) {
  const input = event.target
  const messageId = input.getAttribute('aria-describedby')

  const messageElement = document.getElementById(messageId)

  messageElement.textContent = ''

  const parentDiv = input.closest('.url-input, .custom-url-input')

  parentDiv.classList.remove('invalid')
}

longUrlInput.addEventListener('input', clearErrorMessage)
customSlugInput.addEventListener('input', clearErrorMessage)
