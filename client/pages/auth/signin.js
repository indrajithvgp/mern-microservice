import {useState} from 'react';
import axios from 'axios'
import useRequest from '../../hooks/user-request'
import Router from 'next/router'


const SignIn = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {doRequest, errors} = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email: email, password
        },
        onSuccess:()=> Router.push('/')
    })
 
    const onSubmit = async (e) => {
        e.preventDefault()
        doRequest()
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input  value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
            </div>
            {errors}
            <button className="btn btn-primary">Sign In</button>
        </form>
    )
}

export default SignIn