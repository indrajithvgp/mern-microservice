import {useEffect} from 'react'
import Router from 'next/router'
import useRquest from '../../hooks/user-request'

const SignOut = ({})=>{
    
    const {doRequest} = useRquest({
        url: '/api/users/signout',
        method: 'post',
        body:{},
        onSuccess:()=>Router.push('/')
    })

    useEffect(()=>{
        doRequest()
    },[])

    return (

    )
}

export default SignOut