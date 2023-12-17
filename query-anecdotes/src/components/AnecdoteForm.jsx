import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext, { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {

  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ mutationFn: createAnecdote, 
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['anecdotes']})
    
  }
})

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0})
    dispatch({type: 'CREATE', payload: `Anecdote ${content} has been created`})
    setTimeout(() => {
      dispatch({type: 'DISABLE'})
    }, 5000);
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
