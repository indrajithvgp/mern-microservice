import request from 'supertest'
import {app} from '../../app'



it('returns a 201 on successful signup', async()=>{
    return request(app)
        .post('/api/users/signup')
        .send({ 
            email: 'test@example.com',
            password: 'testtest'
        })
        .expect(201)
})

// it('returns a 400 with an invalid email', async () =>{
//     return request(app)
//         .post('/api/users/signup')
//         .send({
//             email: 'test.com',
//             password: 'testtest'
//         })
//         .expect(400)
// })

// it('sets a cookie after successful signup', async () =>{
//     const response = await request(app)
//         .post('/api/users/signup')
//         .send({
//             email: 'test@g.com',
//             password: 'testtest'
//         })
//         .expect(400)

//     expect(response.get('Set-Cookie')).toBeDefined()
// })
