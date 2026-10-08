const nameInput = document.querySelector('input#name')
const link = '/cat/' + nameInput.dataset.catid

document.querySelector('#deleteBtn').addEventListener('click', async (event) => {
    event.preventDefault()
    if (!confirm('Er du sikker på, at du vil slette katten?')) return

    try {
        const response = await fetch(link, { method: 'DELETE' })
        if (!response.ok) throw new Error('Status ' + response.status)
        window.location = '/'
    } catch (error) {
        alert('Kunne ikke slette katten: ' + error.message)
    }
})

document.querySelector('#editBtn').addEventListener('click', async (event) => {
    event.preventDefault()
    const name = nameInput.value.trim()
    if (!name) return alert('Navnet må ikke være tomt')

    try {
        const response = await fetch(link, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        })
        if (!response.ok) throw new Error('Status ' + response.status)
        window.location = '/'
    } catch (error) {
        alert('Kunne ikke gemme navnet: ' + error.message)
    }
})