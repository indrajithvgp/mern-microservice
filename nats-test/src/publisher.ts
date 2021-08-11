import nats, {Message, Stan} from 'node-nats-streaming'

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

abstract class Listener{
    abstract subject: string;
    abstract queueGroupName: string;
    private client: Stan;
    abstract onMessage(data: any, msg: Message): void;
    protected ackWait = 5*100;
    constructor(client: Stan){
        this.client = client
    }

    subscriptionOptions(){
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName)
    }

    listen(){
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions())

        subscription.on('message', (msg:Message)=>{
            console.log(`Message received: ${this.subject}/${this.queueGroupName}`)
            const parsedData = this.parseMessage(msg)
        })
        this.onMessage(parsedData, msg)
    }

    parseMessage(msg:Message) {
        const data = msg.getData()
        return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf-8'))
    }



}