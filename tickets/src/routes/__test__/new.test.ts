import request from 'supertest'
import {app} from '../../app'


it('has a route listening to /api/tickets for post request', async()=>{
    const response = await request(app).post('/api/tickets')
        .send({})

        expect(response.status).not.toEqual(404)
       
})

it('can be used only if user is authenticated', async()=>{
    const response = await request(app).post('/api/tickets').send({})
    expect(response.statusCode).toEqual(400)
})

it('returns an error if an invalid req is provided', async()=>{
    await request(app).post('/api/tickets').send({
        title: 'sfdghjhkbvnbjn',
        price: 10
    }).expect(400)
})

// it('returns an error if invalid price is provided', async()=>{

// })


// it('creates a ticket with valid price', async()=>{

// })