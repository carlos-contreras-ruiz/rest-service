const searchParams = new URLSearchParams(window.location.search)
if (!searchParams.has('escritorio')) {
    window.location = '/'
    throw new Error('escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio')
console.log(escritorio)

// Referencias del HTML
const lblEscritorio = document.querySelector('h1')
lblEscritorio.innerHTML = 'Escritorio: ' + escritorio

const lblSmall = document.querySelector('small')
const lblPendientes = document.querySelector('#lblPendientes')
const btnAtender = document.querySelector('button')
lblPendientes.innerHTML = ''

const socket = io()

socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false
})

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true
})

socket.on('numero-tickets', (payload) => {
    // console.log('Desconectado del servidor');
    lblPendientes.innerHTML = payload
})

btnAtender.addEventListener('click', () => {
    const payload = {
        escritorio,
    }
    socket.emit('atender-ticket', payload, (payload) => {
        console.log('Desde el server', payload)
        lblSmall.innerHTML = payload.ticket.numero
    })
})
