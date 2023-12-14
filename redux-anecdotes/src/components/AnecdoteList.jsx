import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification, disableNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      if (state.filter === 'ALL') {
        return state.anecdotes
      }
      return state.anecdotes.filter(a => a.content.includes(state.filter))
    })
     
    const dispatch = useDispatch()

    const compareByVotes = (a,b) => {
        return b.votes - a.votes
      }
    
      const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(addVote(anecdote))
        dispatch(setNotification(`You voted '${anecdote.content}'`))
        setTimeout(() => {
          dispatch(disableNotification())
        }, 5000);

      }

      const sortedAnecdotes = [...anecdotes].sort(compareByVotes)

      return (
        <div>
        <h2>Anecdotes</h2>
        {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>
      )
}

export default AnecdoteList