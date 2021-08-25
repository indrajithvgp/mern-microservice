import mongoose from 'mongoose';
import {natsWrapper} from '../src/nats-wrapper'
import { OrderCreatedListener } from './events/listeners/order-created-listener';


const start = async () => {

  try {
    await natsWrapper.connect('ticketing', 'random', 'http://nats-srv:4222')
    
    natsWrapper.client.on('close', ()=>{
            console.log('NATS Connection failed')
            process.exit()
        })
        process.on('SIGINT', ()=> natsWrapper.client.close())
        process.on('SIGTERM', ()=> natsWrapper.client.close())
        new OrderCreatedListener(natsWrapper.client).listen()
      }catch(err){

      }
};

start();
