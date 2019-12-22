import { useState } from 'react'
import axios from 'axios'
export default props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordconfirmation, setPasswordconfirmation] = useState('')
    return (
        <div>
            <h2>Sign up</h2>
            <div>
            <form onSubmit={event => {
                event.preventDefault()
                axios.post('/api/auth/register', {email, password, passwordconfirmation})
            }}>
                <input id='email' type='email' placeholder='Email address' onChange={ e => {
                    setEmail(e.target.value)
                }}/>
                <input id='password' type='password' placeholder='Password' onChange={ e => {
                    setPassword(e.target.value)
                }}/>
                <input
                id='passwordconfirmation'
                type='password'
                placeholder='Enter password again'
                onChange={ e => {
                    setPasswordconfirmation(e.target.value)
                }}
                />
                <button>Sign up</button>
            </form>
            </div>
            <p>
                Already have an account? <a href='#' onClick={() => props.showLogin()}>Log in</a>
            </p>
    </div>
    )
}