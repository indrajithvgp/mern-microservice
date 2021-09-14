import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@i60tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
