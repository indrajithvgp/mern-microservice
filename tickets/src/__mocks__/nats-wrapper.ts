import nats, {Stan} from 'node-nats-streaming'


client.publish = jest.fn().mockImplementation((msg)=>{
    console.log(msg)
})


class NatsWrapper{
    private _client?: Stan
    // constructor(){}
    get client(){
        if(!this._client){
            throw new Error('Cannot access Nats Client before connecting')
        }
        return this._client
    }
    connect(clusterId: string, clientId: string, url: string){
        this._client = nats.connect(clusterId, clientId, {url})

        
        return new Promise<void>((resolve, reject) => {
            this.client.on('connect', ()=>{
                console.log('Connected to Nats')
                resolve()
            })
            this.client.on('error', (err)=>{
                reject(err)
            })
        })
    }
}

export const natsWrapper = new NatsWrapper();