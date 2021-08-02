import Link from 'next/link'


const Header = ({currentUser})=>{
    <nav className="navbar navbar-light bg-light">
        <Link href="/">
            <a className="navbar-brand">GitTix</a>
        </Link>
        <div className="d-flex justify-content-head">
            <ul className="nav d-flex align-items-center">
            {currentUser ? 'Sign Out' : 'Sign In/Up'}
            </ul>
        </div>
    </nav>
}

export default Header