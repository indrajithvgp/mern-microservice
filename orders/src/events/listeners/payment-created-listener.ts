// payment - created - listener.ts

import { Message } from "node-nats-streaming";
import { Subjects, Listener, PaymentCreatedEvent } from "@cygnetops/common";
import { Order } from "../../models/order";
import { queueGroupName } from "./queue-group-name";
import { OrderStatus } from "@i60tickets/common";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const { id, orderId, stripeId } = data;

    const order = await Order.findById({
      orderId
    });
    if(!order){
        throw new Error('Order not found')
    }

    order.set({status: OrderStatus.Complete})


    await order.save();

    msg.ack();
  }
}
