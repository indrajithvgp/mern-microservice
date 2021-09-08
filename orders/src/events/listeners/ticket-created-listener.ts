import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@cygnetops/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { title, price } = data;
    

    const ticket = Ticket.build({
      title,
      price,
      id: 9,
    });
    await ticket.save();

    msg.ack();
  }
}
