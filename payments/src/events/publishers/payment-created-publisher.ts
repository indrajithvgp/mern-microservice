import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@i60tickets/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}