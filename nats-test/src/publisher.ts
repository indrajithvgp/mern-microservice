import nats from 'node-nats-streaming'

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
})

stan.on('connect', ()=>{
    stan.on('close', ()=>{
        process.exit()
    })
    console.log('Publisher connected')
    const data = JSON.stringify({
        id: "123",
        title: "abc",
        price: 200
    })
    stan.publish('ticket:created', data, ()=>{
        console.log('event published..')
    })
})