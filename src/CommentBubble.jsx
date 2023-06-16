import React, { useRef, useState } from 'react'
import Write from './Write'
import Score from './Score';

const CommentBubble = ({ comment, id, handleDelete, handleSubmit, parentId, handleEdit, currentUser, isLoggedIn, handleScore }) => {
    const modal = useRef();
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(comment.content);

    function submitUpdated(e) {
        e.preventDefault()
        handleEdit(comment, updatedContent, id, parentId)
        setIsEditing(val => !val)
    };

    function getRelativeTime(timestamp) {
        const rtf = new Intl.RelativeTimeFormat('en', {numeric: 'auto'});
        const daysDifference = Math.round((timestamp - new Date().getTime()) /  86_400_000);
        return rtf.format(daysDifference, 'hours');
    }
    /* getRelativeTime(new Date().getTime()) */

  return ( <>
    <article className='commentBubble'>
        <Score 
            score={comment.score} 
            handleScore={handleScore}
            id={id}
            parentId={parentId}
            userId={currentUser.userId}
            isLoggedIn={isLoggedIn}
        />
        <div className="interactBtns">
            {(comment.user.userId === currentUser.userId) &&
                <button  className='deleteButton' onClick={() => modal.current.showModal()}>
                <img src="./icon-delete.svg" alt="delete" />
                Delete
            </button>}
            {(comment.user.userId === currentUser.userId) &&
                <button  className='editButton' onClick={() => setIsEditing(val => !val)}>
                <img src="./icon-edit.svg" alt="edit" />
                {isEditing ? <p className='cancelEdit'>Cancel Edit</p> : 'Edit'}
            </button>}
            {isLoggedIn && 
            !(comment.user.userId === currentUser.userId) &&
            <button onClick={() => setIsReplying(val => !val)} className='replyButton'>
                <img src="./icon-reply.svg" alt="reply" />
                {isReplying ? <p className='cancelReply'>Cancel Reply</p> : 'Reply'}
            </button>}
        </div>
        <div className='fullWidth'>
            <div className="commentHeaders">
                <img src={comment.user.image.png} alt="displayPhoto" className="displayPhoto" />
                <p className='commentAuthor'>{comment.user.username}</p>
                {(comment.user.userId === currentUser.userId) && <div className='youIndicator'>you</div>}
                <p className='commentDate'>{comment.createdAt}</p>
            </div>
            {!isEditing && <p className='commentContent'>{comment.content}</p>}
            {isEditing && <form onSubmit={e => submitUpdated(e)}>
                <textarea 
                    autoFocus
                    id="editComment" 
                    className='textarea' 
                    value={updatedContent}
                    onChange={e => setUpdatedContent(e.target.value)}
                />
                <button type='submit' className='submit'>UPDATE</button>
            </form>}
        </div>
    </article>
    {isReplying && <Write 
        handleSubmit={handleSubmit} 
        btnText="REPLY" 
        parentId={parentId}
        initialValue={`@${comment.user.username} `}
        isReplying={isReplying}
        setIsReplying={setIsReplying}
        currentUser={currentUser}
    />}
    <dialog ref={modal} className='modal'>
        <p className='commentAuthor'>Delete comment</p>
        <p className='commentContent'>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
        <div className="spaceBetween">
            <button className='cancelDelete' onClick={() => modal.current.close()}>NO, CANCEL</button>
            <button className='confirmDelete' onClick={() => handleDelete(id, parentId)}>YES, DELETE</button>
        </div>
    </dialog>
  </>)
}

export default CommentBubble