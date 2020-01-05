import Link from 'next/link'
import {useStoreActions, useStoreState} from 'easy-peasy'
import store from '../store'
import axios from 'axios'
import Router from 'next/router'
import {useState} from 'react'

const Header = () => {
    const [menuExpanded, setMenuExpanded] = useState(false)
    //Two ways of using actions show below
    //useStoreActions & useStoreState will ensure when store update react view also updates
    const setShowLoginModal = () => store.getActions().modals.setShowLoginModal()
    const setShowRegistrationModal = useStoreActions(
        actions => actions.modals.setShowRegistrationModal
    )
    const user = useStoreState(state => state.user.user)
    const setUser = useStoreActions(actions => actions.user.setUser)
    const content = (
    <div className='nav-container'>
        <Link href='/'>
            <a><img src='/img/logo.png' alt=''/></a>
        </Link>
        <nav className={menuExpanded ? 'expanded' : 'collapsed'}>
            {user ? (
                <ul>
                    <li className='hamburger-menu'>
                        <a style={{padding: 0}} onClick= {() => setMenuExpanded(!menuExpanded)} href='#'><img src='/img/burger-icon.png' alt=''/></a>
                    </li>
                    <li className='username'>{user}</li>
                    <li>
                        <Link href='/bookings'>
                            <a>Bookings</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/host'>
                        <a>Your Houses</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/host/new'>
                            <a>Add House</a>
                        </Link>
                    </li>
                    <li>
                    <a href='#'
                    onClick={async () => {
                        await axios.post('/api/auth/logout')
                        setUser(null)
                        Router.push('/')
                    }}>
                        Log Out
                    </a>
                    </li>    
                </ul>
                ) : (
                <ul>
                    <li className='hamburger-menu'>
                        <a><img src='/img/burger-icon.png' alt=''/></a>
                    </li>
                    <li>
                        <a href='#' onClick={()=> setShowRegistrationModal()}>Sign up</a>
                    </li>
                    <li>
                        <a href='#' onClick={() => setShowLoginModal()}>Login</a>
                    </li> 
                </ul>
            )}                     
        </nav>

        <style jsx>{`
            ul {
                margin: 0;
                padding: 0;
                position: absolute;
                right: 0;
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
            nav a:hover {
                color: rgb(255, 90, 95);
            }
            nav li:first-child {
                display: none;
            }
            .nav-container {
                border-bottom: 1px solid #eee;
                height: 50px;
            }
            img {
                float: left;
                width: 50px;
            }
            .username {
                padding: 1em 0.5em;
                font-weight: 700;
                margin-right: 15px;
            }

            @media screen and (max-width: 600px) {
                nav li:not(:first-child) {display: none;}
                nav li:first-child {display: block; float: right;}
                nav.expanded li:not(:first-child) {
                    display: block;
                    width: 100%;
                    position:relative;
                    z-index:1;
                    text-align: center;
                    background-color:white;
                }
            }
        `}</style>
    </div>
    )
    return content
}

export default Header