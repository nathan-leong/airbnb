import axios from 'axios'
import {useStoreActions} from 'easy-peasy'
import {useState} from 'react'
export default props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const setHideModal = useStoreActions(actions => actions.modals.setHideModal)
  const setUser = useStoreActions(actions => actions.user.setUser)

  const content = (
      <div>
        <h2>Log in</h2>
        <div>
          <form onSubmit={ async event => {
              event.preventDefault()
              try{
                const response = await axios.post('/api/auth/login',{email, password})
                if (response.data.status === 'error') {
                  alert(response.data.message)
                  return
                }
                setHideModal()
                setUser(email)
                setEmail('')
                setPassword('')
              }catch (error) {
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
            <button>Log in</button>
          </form>
        </div>
        <p>
          Don't have an account yet?{' '}
          <a href='#' onClick={() => props.showSignup()}>Sign up</a>
        </p>
      </div>
  )
  return content
}