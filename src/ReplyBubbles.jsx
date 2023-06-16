import React from 'react'

const ReplyBubbles = ({ comment }) => {
  return (
    <article key={comment.id} className='parentComment'>
        <div className='score'>
            <button>+</button>
            {comment.score || 0}
            <button>-</button>
        </div>
        <div>
            <div className="commentHeaders">
                <p className='commentAuthor'>{comment.user.username}</p>
                <p className='commentDate'>{comment.createdAt}</p>
            </div>
            <div className="interactBtns">
                <button  className='deleteButton'>
                    <img src="./icon-delete.svg" alt="delete" />
                    Delete
                </button>
                <button  className='editButton'>
                    <img src="./icon-edit.svg" alt="edit" />
                    Edit
                </button>
                <button  className='replyButton'>
                    <img src="./icon-reply.svg" alt="reply" />
                    Reply
                </button>
            </div>
            <p className='commentContent'>{comment.content}</p>
        </div>
    </article>
  )
}

export default ReplyBubbles