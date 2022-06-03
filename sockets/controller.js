const TicketController = require('../models/ticket')

const ticketControl = new TicketController()

const socketController = (socket) => {
    //console.log('Cliente conectado ', socketServer.id)

    socket.on('disconnect', () => {
        //console.log('Cliente desconectado')
    })

    socket.on('siguiente-ticket', (payload, callback) => {
        const siguiente = ticketControl.siguiente()
        //notificar nuevo ticket
        socket.broadcast.emit('enviar-mensaje', payload)
        callback({ ticket: siguiente })
    })

    socket.on('atender-ticket', (payload, callback) => {
        if (!payload.escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio',
            })
        }
        const ticket = ticketControl.atenderTicket(payload.escritorio)
        //notificar nuevo ticket
        socket.broadcast.emit('enviar-mensaje', payload)
        callback({ ok: true, ticket })
    })

    socket.emit('ultimo-ticket', ticketControl.ultimo)
    socket.emit('numero-tickets', ticketControl.tickets.length)
}

module.exports = {
    socketController,
}
