import React, { useState } from 'react'

const Write = ({ btnText, handleSubmit, parentId, initialValue = '', currentUser, setIsReplying }) => {
  const [newContent, setNewContent] = useState(initialValue);
  
  function postComment(e) {
    e.preventDefault()
    handleSubmit(newContent, parentId)
    setNewContent('')
    try {setIsReplying(false)} catch (err) {}
  }  
  
  return (
    <form onSubmit={postComment} className='write'>
      <img src={`${currentUser.image.png}`} alt="displayPhoto" className="displayPhoto" />
      <label htmlFor="writeBox"></label>
      <textarea 
        className='textarea'
        autoFocus
        spellCheck="false"
        id="writeBox"
        value={newContent}
        onChange={e => setNewContent(e.target.value)}
        />
      <button type='submit' className='submit'>{btnText}</button>
    </form>
  )
}

export default Write
