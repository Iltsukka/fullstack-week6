import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, disableNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (e) => {
        e.preventDefault()
        const content = e.target.newAnecdote.value
        e.target.newAnecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        dispatch(setNotification(`Anecdote '${content}' has been created`))
        setTimeout(() => {
          dispatch(disableNotification())
        }, 5000);

      }
    
    return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='newAnecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
    )
}

export default AnecdoteForm