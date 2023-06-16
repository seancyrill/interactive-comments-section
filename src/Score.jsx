import React, { useEffect, useRef, useState } from 'react'

const Score = ({ score, handleScore, id, parentId, userId, isLoggedIn }) => {
    const [upVoted, setUpVoted] = useState(false);
    const [downVoted, setDownVoted] = useState(false);
    const scoreRef = useRef(score)

    useEffect(() => {
      setUpVoted(false), setDownVoted(false)
      if (score.userUpvotes.includes(userId)) {
        setUpVoted(true)
      } else if (score.userDownvotes.includes(userId)) {
        setDownVoted(true)
      }
    }, [userId])

    function handleScoreBtn(key) {
      const newScore = scoreRef.current
      switch (key) {
        case 'voteUp':
          {downVoted && setDownVoted(false)
            newScore.userDownvotes = newScore.userDownvotes.filter(id => id != userId)}
          setUpVoted(true)
          newScore.userUpvotes.push(userId)
          handleScore(id, parentId, newScore)
          break;
        case 'cancelUp':
          setUpVoted(false)
          newScore.userUpvotes = newScore.userUpvotes.filter(id => id != userId)
          handleScore(id, parentId, newScore)
          break;
        case 'voteDown':
          {upVoted && setUpVoted(false)
            newScore.userUpvotes = newScore.userUpvotes.filter(id => id != userId)}
          setDownVoted(true)
          newScore.userDownvotes.push(userId)
          handleScore(id, parentId, newScore)
          break;
        case 'cancelDown':
          setDownVoted(false)
          newScore.userDownvotes = newScore.userDownvotes.filter(id => id != userId)
          handleScore(id, parentId, newScore)
          break;
      
        default:
          break;
      }
    }

  return (<>
    {!isLoggedIn && <div className='score'><p className='scoreCount'>{score.userUpvotes.length - score.userDownvotes.length}</p></div>}
    {isLoggedIn && <div className='score'>
        {!upVoted && <button className='upvoteHover' onClick={()=> handleScoreBtn('voteUp')}>+</button>}
        {upVoted && <button className='upvoteHover upvoted' onClick={()=> handleScoreBtn('cancelUp')}>+</button>}
        <p className='scoreCount'>{score.userUpvotes.length - score.userDownvotes.length}</p>
        {!downVoted && <button className='downvoteHover' onClick={()=> handleScoreBtn('voteDown')}>-</button>}
        {downVoted && <button className='downvoteHover downvoted' onClick={()=> handleScoreBtn('cancelDown')}>-</button>}
    </div>}
  </>)
}

export default Score