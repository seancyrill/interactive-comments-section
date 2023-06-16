import React, { useEffect, useState } from 'react'
import CommentBubble from './CommentBubble'
import Replies from './Replies'
import Write from './Write'
import axios from 'axios'

const Comments = ({ currentUser, isLoggedIn }) => {
  const [comments, setComments] = useState([]);
  const [isCommenting, setIsCommenting] = useState(true)
  const API_URL_COMMENTS = 'https://646d712a9c677e23218a05e6.mockapi.io/comments';
  
  useEffect(() => {
    async function fetchComments () {
      try {
        const response = await axios.get(API_URL_COMMENTS)
        setComments(response.data)
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchComments()
  }, []);

  async function handleSubmit (message, parentId) {
    const date = new Date
    let newComment = {
      id: crypto.randomUUID(),
      content: message,
      createdAt: (new Intl.DateTimeFormat('en-us', {dateStyle: 'medium', timeStyle: 'short'})).format(date),
      user: currentUser,
      score: {userUpvotes: [], userDownvotes: []},
      replies: []
    }
    try {
      if (!parentId) {
        const response = await axios.post(API_URL_COMMENTS, newComment)
        setComments([...comments, response.data])
      } else {
        const findParent = [...comments].find(comment => comment.parentRef == parentId);
        const modifiedParent = {...findParent, replies: [...findParent.replies, newComment]};
        const response = await axios.put(`${API_URL_COMMENTS}/${parentId}`, modifiedParent);
        const replaceParent = [...comments].map(comment => comment.parentRef == parentId ? response.data : comment);
        setComments(replaceParent)
      } 
    } catch(err) {
      console.log(err.message)
    }
  }

  async function handleEdit (comment, message, id, parentId) {
    const date = new Date
    let newComment = {
      ...comment, 
      content: message, 
      createdAt: `last edited ${(new Intl.DateTimeFormat('en-us', {dateStyle: 'medium', timeStyle: 'short'})).format(date)}`
    }
    try {
      if([...comments].some(comment => comment.id == id)){
        const response = await axios.put(`${API_URL_COMMENTS}/${parentId}`, newComment);
        const editedParents = comments.map(comment => comment.id != id ? comment : response.data)
        setComments(editedParents)
      } else {
        const findParent = [...comments].find(comment => comment.parentRef == parentId);
        const modifiedParent = {...findParent, replies: findParent.replies.map(reply => reply.id != id ? reply : newComment)};
        const response = await axios.put(`${API_URL_COMMENTS}/${parentId}`, modifiedParent);
        const replaceParent = [...comments].map(comment => comment.parentRef == parentId ? response.data : comment);
        setComments(replaceParent)
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  async function handleDelete (id, parentId) {
    try {
      if([...comments].some(comment => comment.id == id)){
        await axios.delete(`${API_URL_COMMENTS}/${parentId}`)
        const filterParent = [...comments].filter(comment => comment.id != id)
        setComments(filterParent)
      } else {
        const findParent = [...comments].find(comment => comment.parentRef == parentId);
        const modifiedParent = {...findParent, replies: findParent.replies.filter(reply => reply.id != id)};
        const response = await axios.put(`${API_URL_COMMENTS}/${parentId}`, modifiedParent);
        const replaceParent = [...comments].map(comment => comment.parentRef == parentId ? response.data : comment);
        setComments(replaceParent)
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  async function handleScore(id, parentId, newScore) {
    try {
      if([...comments].some(comment => comment.id == id)){
        const response = await axios.put(`${API_URL_COMMENTS}/${parentId}`, {score: newScore});
        const replaceParent = [...comments].map(comment => comment.parentRef != parentId ? comment : response.data);
        setComments(replaceParent)
      } else {
        const findParent = [...comments].find(comment => comment.parentRef == parentId);
        const modifiedParent = {...findParent, replies: findParent.replies.map(reply => reply.id != id ? reply : {...reply, score: newScore})};
        const response = await axios.put(`${API_URL_COMMENTS}/${parentId}`, modifiedParent);
        const replaceParent = [...comments].map(comment => comment.parentRef == parentId ? response.data : comment);
        setComments(replaceParent)
      }
    } catch(err) {
      console.log(err.message)
    }
  }
  
  return ( <>
    <main className='commentCard'>
        {!comments.length && "No posts to show"}
        {comments.map(comment => (
          <section  key={comment.id}>
              <CommentBubble 
                comment={comment} 
                id={comment.id} 
                handleDelete={handleDelete} 
                handleSubmit={handleSubmit} 
                handleEdit={handleEdit}
                parentId={comment.parentRef}
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
                handleScore={handleScore}
                />
              <Replies 
                comment={comment}
                handleDelete={handleDelete} 
                handleSubmit={handleSubmit} 
                handleEdit={handleEdit}
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
                handleScore={handleScore}
                />
          </section>
        ))}
    </main>
    {isLoggedIn && <footer className='footer'>
        {isCommenting && <Write 
          btnText="SEND"
          handleSubmit={handleSubmit}
          currentUser={currentUser}
        />}
      {!isCommenting && <button className='commentBtn' onClick={() => setIsCommenting(true)}>TAP TO COMMENT</button>}
      {isCommenting && <button className='commentBtn' onClick={() => setIsCommenting(false)}>TAP TO HIDE</button>}
    </footer>}
  </>)
}

export default Comments