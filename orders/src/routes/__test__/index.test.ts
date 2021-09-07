import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";
import { OrderStatus } from "@i60tickets/common";

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 200,
  });
  await ticket.save();
  return ticket;
};

it("fetches order for an particular user", async () => {
  const t1 = await buildTicket();
  const t2 = await buildTicket();
  const t3 = await buildTicket();

  const u1 = global.signin();
  const u2 = global.signin();

  await request(app)
    .post("/api/orders")
    .set("Cookie", u2)
    .send({ ticketId: t2.id })
    .expect(201);
  await request(app)
    .post("/api/orders")
    .set("Cookie", u1)
    .send({ ticketId: t1.id })
    .expect(201);
  await request(app)
    .post("/api/orders")
    .set("Cookie", u2)
    .send({ ticketId: t3.id })
    .expect(201);
});
