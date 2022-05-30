const socketController = (socket) => {
    //console.log('Cliente conectado ', socketServer.id)

    socket.on('disconnect', () => {
        //console.log('Cliente desconectado')
    })

    socket.on('enviar-mensaje', (payload, callback) => {
        const id = 123456
        //Con broadcast todos los clientes suscritos reciben el mensaje
        //excepto quien lo envio
        socket.broadcast.emit('enviar-mensaje', payload)
        callback({ id })
    })
}

module.exports = {
    socketController,
}
