import React, { useEffect, useState } from 'react'
import Register from './Register';
import Login from './Login';
import Attribution from './Attribution';
import axios from 'axios'

const Accounts = ({ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn, defaultUser }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const API_URL_USER = 'https://646d712a9c677e23218a05e6.mockapi.io/users';

  const [users, setUsers] = useState([])

   useEffect(() => {
    async function fetchUsers () {
      try {
        const response = await axios.get(API_URL_USER)
        setUsers(response.data)
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchUsers()
   }, [])

   useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("currentUser"))) {
      const loginSession = JSON.parse(sessionStorage.getItem("currentUser"));
      setCurrentUser(loginSession)
      if(loginSession.userId != 'unlogged') setIsLoggedIn(true)
    }
   }, [])

  async function createNewUser(username, selectedDp) {
    const newUser = {
      userId: (users.length + 1),
      image: {
        png: selectedDp
      },
      username: username
    }
    const response = await axios.post(API_URL_USER, newUser);
    setUsers([...users ,response.data]);
    setCurrentUser(response.data);
    sessionStorage.setItem("currentUser", JSON.stringify(response.data));
  }
  
  function handleLogOut(e) {
    e.preventDefault();
    setCurrentUser(defaultUser);
    sessionStorage.setItem("currentUser", JSON.stringify(defaultUser));
    setIsLoggedIn(false);
  }

  return ( <>
    <nav className='accountsNav'>
      <Attribution />
      {(!isLoggingIn && !isRegistering) && !isLoggedIn && <div className="loginBtnCtn">
        <button onClick={() => setIsRegistering(val => !val)} className='loginBtn submit' type='submit'>Register</button>
        <p className='grayText'>-OR-</p>
        <button onClick={() => setIsLoggingIn(val => !val)} className='loginBtn submit' type='submit'>Log-in</button>
      </div>}
      {isLoggedIn && <div className='loggedNav'>
        <img className='loggedPhoto' src={currentUser.image.png} alt="dp" />
        <p className='accountName'>{currentUser.username}</p>
        <button className='loginBtn submit' onClick={e => handleLogOut(e)}>Log-out</button>
      </div>}
    </nav>
    {isRegistering && 
      <Register 
        users={users} 
        createNewUser={createNewUser}
        setIsLoggedIn={setIsLoggedIn}
        setIsRegistering={setIsRegistering}
    />}
    {isLoggingIn && 
      <Login
      users={users} 
      setCurrentUser={setCurrentUser}
      setIsLoggedIn={setIsLoggedIn} 
      setIsLoggingIn={setIsLoggingIn}
    />}
  </>)
}

export default Accounts