const path = require('path')
const fs = require('fs')

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero
        this.escritorio = escritorio
    }
}

class TicketController {
    constructor() {
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.ultimos4 = []

        this.init()
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        }
    }

    init() {
        const data = require('../db/data.json')
        const { hoy, ultimo, ultimos4, tickets } = data
        if (hoy === this.hoy) {
            //mismo dia
            this.tickets = tickets
            this.ultimo = ultimo
            this.ultimos4 = ultimos4
        } else {
            //otro dia
            this.guardarDB()
        }
    }

    guardarDB() {
        const dbPath = path.join(__dirname, '../db/data.json')
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }

    siguiente() {
        this.ultimo += 1
        const ticket = new Ticket(this.ultimo, null)
        this.tickets.push(ticket)
        this.guardarDB()
        return this.ultimo
    }

    atenderTicket(excritorio) {
        if (this.tickets.length === 0) {
            return
        }

        const ticket = this.tickets.shift()
        ticket.escritorio = excritorio
        this.ultimos4.unshift(ticket)

        if (this.ultimos4.length > 4) {
            //borra el ultimo
            this.ultimos4.splice(-1, 1)
        }
        this.guardarDB()
        return ticket
    }
}

module.exports = TicketController
