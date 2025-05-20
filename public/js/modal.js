const modal = document.getElementById('messageModal')
const copyButton = document.getElementById('copyButton')
const closeButton = document.getElementById('closeModal')

export function closeModal() {
  modal.classList.add('hidden')
}

export function openModal(url) {
  const input = document.getElementById('copyInput')

  input.value = url

  modal.classList.remove('hidden')
}

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal()
  }
})

copyButton.addEventListener('click', () => {
  const copyInput = document.getElementById('copyInput')

  copyButton.classList.add('success')
  navigator.clipboard.writeText(copyInput.value)

  setTimeout(() => {
    copyButton.classList.remove('success')
  }, 800)

  console.log(copyInput.value)
})

closeButton.addEventListener('click', () => {
  const shortenerForm = document.getElementById('shortenerForm')

  shortenerForm.reset()

  closeModal()
})
