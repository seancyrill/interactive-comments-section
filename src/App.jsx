import { useState } from 'react'
import Comments from './Comments';
import Accounts from './Accounts';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const defaultUser = {
    image: {
      png: "/favicon-32x32.png",
    },
    username: "",
    userId: 'unlogged',
    scored: {upVoted: [], downVoted: []}
  }
  const [currentUser, setCurrentUser] = useState(defaultUser)

  return (
    <>
      <Accounts 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        defaultUser={defaultUser}
      />
      <Comments 
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
      />
    </>
  )
}

export default App
