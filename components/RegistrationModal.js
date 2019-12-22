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
            <form onSubmit={async event => {
                event.preventDefault()
                try {
                    const response = await axios.post('api/auth/register', { email, password, passwordconfirmation })
                    if (response.data.status === 'error') {
                      alert(response.data.message)
                      return
                    }
                } catch (error) {
                    console.log('error ',error)
                    alert(error)
                    return
                }
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