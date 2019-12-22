import Link from 'next/link'
import {useStoreActions} from 'easy-peasy'
import store from '../store'

const Header = () => {
    //Two ways of using actions show below
    const setShowLoginModal = () => store.getActions().modals.setShowLoginModal()
    const setShowRegistrationModal = useStoreActions(
        actions => actions.modals.setShowRegistrationModal
    )
    const content = (
    <div className='nav-container'>
        <Link href='/'>
            <a><img src='/img/logo.png' alt=''/></a>
        </Link>
        <nav>
            <ul>
                <li>
                    <a href='#' onClick={()=> setShowRegistrationModal()}>Sign up</a>
                </li>
                <li>
                    <a href='#' onClick={() => setShowLoginModal()}>Login</a>
                </li>        
            </ul>
        </nav>

        <style jsx>{`
            ul {
                margin: 0;
                padding: 0;
                float: right;
            }
        
            li {
                display: block;
                float: left;
            }
        
            a {
                text-decoration: none;
                display: block;
                margin-right: 15px;
                color: #333;
            }

            nav a {
                padding: 1em 0.5em;
            }

            .nav-container {
                border-bottom: 1px solid #eee;
                height: 50px;
            }
            img {
                float: left;
                width: 50px;
            }
        `}</style>
    </div>
    )
    return content
}

export default Header