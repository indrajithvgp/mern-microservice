import mongoose from 'mongoose';
import {natsWrapper} from '../src/nats-wrapper'
import { OrderCreatedListener } from './events/listeners/order-created-listener';


const start = async () => {
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

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
