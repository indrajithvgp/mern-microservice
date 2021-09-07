import request from 'supertest'
import {app} from '../../app'
import mongoose from 'mongoose'
import {Order} from '../../models/order'
import { Ticket } from "../../models/ticket";
import { OrderStatus } from '@i60tickets/common';


it("it returns an error if ticket does not exist", async () => {
    const ticketId = mongoose.Types.ObjectId();
   await request(app).post('/api/orders').set('Cookie', global.signin()).send({
        ticketId
    }).expect(400)
});


it("it returns an error if ticket is already reserved", async () => {
  const ticket = Ticket.build({
      title: 'concert',
      price: 20
  })

  await ticket.save()
  const order = Order.build({
      ticket,
      userId: 'hsf',
      status: OrderStatus.Created,
      expiresAt: new Date(),
  })

  await order.save()

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({
      ticketId: ticket.id,
    })
    .expect(400);

});

it.todo('emits an order created event')