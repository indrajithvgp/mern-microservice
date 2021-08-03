import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client'
import Header from '../components/header'

const AppComponent = ({Component, pageProps, currentUser}) => {


    return (
        <div>
        <Header currentUser={currentUser}/>
        <Component {...pageProps}/>
        </div>
    )
}


//ctx sits inside appContext


AppComponent.getInitialProps = async (appContext)=>{


    // console.log(appContext)


    const client = await buildClient(appContext.ctx)
    const {data} = await client.get('/api/users/currentuser')

    let pageProps = {}

    if(appContext.Component.getInitialProps){
        pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }
    // console.log(pageProps)
    return {
        pageProps,
        ...data
    }
}

export default AppComponent