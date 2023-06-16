import React, { useState } from 'react'
import CommentBubble from './CommentBubble'

const Replies = ({ comment, handleDelete, handleSubmit, handleEdit, currentUser, isLoggedIn, handleScore }) => {
    const [repliesHidden, setRepliesHidden] = useState(false)

  return (
    <div className="replySection">
        {(comment.replies.length > 0) && <button className='collapseBtn' onClick={() => setRepliesHidden(val => !val)}/>}
        {(comment.replies.length > 0) 
            && repliesHidden 
            && <button 
            className='collapseBubble'
            onClick={() => setRepliesHidden(val => !val)}
        >{`Show ${comment.replies.length} Replies`}</button>}
        {!repliesHidden && <div className="replies">
            {comment.replies.map(reply => (
            <React.Fragment key={reply.id}>
                <CommentBubble 
                comment={reply} 
                id={reply.id} 
                handleDelete={handleDelete} 
                handleSubmit={handleSubmit} 
                handleEdit={handleEdit}
                parentId={comment.parentRef}
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
                handleScore={handleScore}
                />
            </React.Fragment>
            ))}
        </div>}
    </div>
  )
}

export default Replies