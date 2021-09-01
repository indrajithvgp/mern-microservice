import {Publisher, Subjects, TicketCreatedEvent} from '@i60tickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated
}   