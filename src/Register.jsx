import React, { useRef, useState } from 'react'

const Register = ({ users, createNewUser, setIsLoggedIn, setIsRegistering }) => {
  const [selectedDp, setSelectedDp] = useState('./images/avatars/image-juliusomo.png');
  const [registerUser, setRegisterUser] = useState('');
  const [registerError, setRegisterError] = useState(false)
  const dp1 = useRef();
  const dp2 = useRef();
  const dp3 = useRef();
  const dp4 = useRef();

  function handleDisplayPhoto(id) {
      switch (id) {
        case 'dphoto1':
          setSelectedDp(dp1.current.src);
          dp2.current.classList.remove('selectedDp'); dp3.current.classList.remove('selectedDp'); dp4.current.classList.remove('selectedDp');
          dp1.current.classList.add('selectedDp')
          break;
        case 'dphoto2':
          setSelectedDp(dp2.current.src);
          dp1.current.classList.remove('selectedDp'); dp3.current.classList.remove('selectedDp'); dp4.current.classList.remove('selectedDp');
          dp2.current.classList.add('selectedDp')
          break;
        case 'dphoto3':
          setSelectedDp(dp3.current.src);
          dp2.current.classList.remove('selectedDp'); dp1.current.classList.remove('selectedDp'); dp4.current.classList.remove('selectedDp');
          dp3.current.classList.add('selectedDp')
          break;
        case 'dphoto4':
          setSelectedDp(dp4.current.src);
          dp2.current.classList.remove('selectedDp'); dp3.current.classList.remove('selectedDp'); dp1.current.classList.remove('selectedDp');
          dp4.current.classList.add('selectedDp')
          break;
      
        default:
          break;
      }
    };
  
  function handleCreate(e) {
      e.preventDefault()
      if (!(users.filter(user => user.username == registerUser)).length) {
        createNewUser(registerUser, selectedDp)
        setIsLoggedIn(true)
        setIsRegistering(false)
        setRegisterError(false)
        handleDisplayPhoto('dphoto1')
      } else {
        setRegisterError(true)
      }
      setRegisterUser('')
  }

  return ( <>
    <div className="registerPage">
      <form className='registerCtn' onSubmit={handleCreate}>
        <button className='closeNav' onClick={() => setIsRegistering(false)}>X</button>
        <label className='loginLabel' htmlFor="registerInput">Create a new account</label>
        <input
          required
          autoFocus
          className='loginInput marginTop'
          type="text"
          id='registerInput'
          placeholder='Enter new username'
          value={registerUser}
          onChange={e => setRegisterUser(e.target.value)}
        />
        {registerError && <p id='registerError' className='registerError hideError'> Your chosen username has already been taken</p>}
        <p className='loginLabel marginTop'>Pick your display photo</p>
        <div className="loginPhoto">
            <img onClick={(e) => handleDisplayPhoto(e.target.id)} src="/image-juliusomo.png" alt="dphoto1" id='dphoto1' ref={dp1} className='selectedDp'/>
            <img onClick={(e) => handleDisplayPhoto(e.target.id)} src="/image-amyrobson.png" alt="dphoto2" id='dphoto2' ref={dp2} />
            <img onClick={(e) => handleDisplayPhoto(e.target.id)} src="/image-maxblagun.png" alt="dphoto3" id='dphoto3' ref={dp3} />
            <img onClick={(e) => handleDisplayPhoto(e.target.id)} src="/image-ramsesmiron.png" alt="dphoto4" id='dphoto4' ref={dp4} />
        </div>
        <button className='registerBtn submit marginTop' type='submit'>Register</button>
      </form>
      <div className="mask" onClick={() => setIsRegistering(false)} />
    </div>
</>)
}

export default Register