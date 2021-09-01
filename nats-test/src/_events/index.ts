import nats, { Message, Stan } from "node-nats-streaming";
import { TicketCreatedListener } from "./ticket-created-listener";
import { randomBytes } from "crypto";
import { TicketCreatedPublisher } from "./ticket-created-publisher";

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
  stanMaxPingOut: 3,
  stanPingInterval: 1000,
});

stan.on("connect", async () => {
  console.log("connected");
  stan.on("close", () => {
    console.log("Nats connection closed");
  });
  try {
    await new TicketCreatedPublisher(stan).publish({
      title: "OYO",
      id: "1",
      price: 200,
    });
  } catch (err) {
    console.error(err);
  }
  new TicketCreatedListener(stan).listen();
});
