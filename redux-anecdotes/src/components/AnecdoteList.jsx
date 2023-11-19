import { useDispatch, useSelector } from "react-redux"
import { handleVotes } from "../reducers/anecdoteReducer"

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
    
      const vote = (id) => {
        console.log('vote', id)
        dispatch(handleVotes(id))
      }

      return (
        <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort(compareByVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
      )
}

export default AnecdoteList