import request from 'supertest'
import {app} from '../../app'

it('fails when email that does not exist', async()=>{
    await request(app)
        .post('/api/users/signin') 
        .send({ 
            email: 'test@example.com',
            password: 'testtest'
        })
        .expect(400)
})


