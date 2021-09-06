
import {Publisher, Subjects, TicketUpdatedEvent} from '@i60tickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}   