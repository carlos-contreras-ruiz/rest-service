const socketCliente = io()
const labelONline = document.querySelector('#online')
const labelOffline = document.querySelector('#offline')

const inputText = document.querySelector('#txtMesg')
const btnText = document.querySelector('#btnMsg')
const pauloadText = document.querySelector('#payload')

socketCliente.on('connect', () => {
    console.log('Conectado')
    labelONline.style.display = 'block'
    labelOffline.style.display = 'none'
})
socketCliente.on('disconnect', () => {
    console.log('DESConectado')
    labelONline.style.display = 'none'
    labelOffline.style.display = 'block'
})
socketCliente.on('enviar-mensaje', (payload) => {
    console.log(payload)
    pauloadText.innerText = JSON.stringify(payload)
})

btnText.addEventListener('click', () => {
    const payload = {
        mensaje: inputText.value,
    }

    socketCliente.emit('enviar-mensaje', payload, (okMessage) => {
        console.log('Desde server callback emit ', okMessage)
    })
})
