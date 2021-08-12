import nats, {Message, Stan} from 'node-nats-streaming'
import { randomBytes } from 'crypto'
import {TicketCreatedListener} from './events/ticket-created-listener'

const stan = nats.connect('ticketing', randomBytes(4).toString('hex') , {
    url: 'http://localhost:4222'
})

stan.on('connect', ()=>{
    console.log('Listener connected to NATS')
    stan.on('close', ()=>{
        console.log('NATS Connection Closed')
        process.exit()
    })
    new TicketCreatedListener(stan).listen()


    //misc
    {
        // const data = JSON.stringify({
    //     id: "123",
    //     title: "abc",
    //     price: 200
    // })
    // stan.publish('ticket:created', data, ()=>{
    //     console.log('event published..')
    // })
    }
})


