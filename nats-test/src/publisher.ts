import nats, {Message, Stan} from 'node-nats-streaming'
import { randomBytes } from 'crypto'
import { TicketCreatedPublisher } from './events/ticket-created-publisher'

const stan = nats.connect('ticketing', randomBytes(4).toString('hex') , {
    url: 'http://localhost:4222'
})

stan.on('connect', async()=>{
    console.log('Publisher connected to NATS')
    const publisher = new TicketCreatedPublisher(stan)
    try{
        await publisher.publish({
            id: "123",
            title: "abc",
            price: 200
        })
    }catch(err){
        console.log(err)
    }
    
    
})


