import buildClient from '../api/build-client'

const LandingPage = ({currentUser}) => {
    return currentUser ? (
        <div>
            Hello la..!
        </div>
    ): null;
}

LandingPage.getInitialProps = async(context)=>{
    const client = buildClient(context)
    const {data} = await client.get('/api/users/currentuser')
    return data

    // if(typeof window === 'undefined'){
    //     const {data} = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
    //         headers: req.headers,
    //     })
    //     return data
    // }else{
    //     const {data} = await axios.get('/api/users/currentuser')
    //     return data
    // }
    // return {}
}

export default LandingPage
