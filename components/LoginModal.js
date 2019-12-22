export default props => (
    <div>
      <h2>Log in</h2>
      <div>
        <form onSubmit={event => {
            alert('Login@!')
            event.preventDefault()
        }}>
          <input id='email' type='email' placeholder='Email address' />
          <input id='password' type='password' placeholder='Password' />
          <button>Log in</button>
        </form>
      </div>
      <p>
        Don't have an account yet?{' '}
        <a href='#' onClick={() => props.showSignup()}>Sign up</a>
      </p>
    </div>
  )