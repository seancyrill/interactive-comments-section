import React, { useState } from 'react'

const Login = ({ users, setCurrentUser, setIsLoggedIn, setIsLoggingIn }) => {
  const [loginUser, setLoginUser] = useState('');
  const [loginError, setLoginError] = useState(false)

  function handleLogIn(e) {
    e.preventDefault()
    if (users.filter(user => user.username == loginUser).length) {
      const login = users.filter(user => user.username == loginUser);
      setCurrentUser(...login)
      sessionStorage.setItem("currentUser", JSON.stringify(...login));
      setIsLoggedIn(true)
      setIsLoggingIn(false)
      setLoginError(false)
    } else {
      setLoginError(true)
    }
    setLoginUser('')
  }


  return (<>
    <div className='loginPage'>
        <form className='loginCtn' onSubmit={e => handleLogIn(e)}>
          <button className='closeNav' onClick={() => setIsLoggingIn(false)}>X</button>
          <label className='loginLabel' htmlFor="loginInput">Log-in</label>
          <input
            required
            autoFocus
            className='loginInput marginTop'
            type="text"
            id='loginInput'
            placeholder='Enter username'
            value={loginUser}
            onChange={e => setLoginUser(e.target.value)}
          />
          {loginError && <p id='loginError' className='loginError'>User does not exist</p>}
          <button className='loginBtn submit marginTop' type='submit'>Log-in</button>
        </form>
      <div onClick={() => setIsLoggingIn(false)} className="mask" />
    </div>
</>)
}

export default Login