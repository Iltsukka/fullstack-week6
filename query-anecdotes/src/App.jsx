import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { QueryClient, useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import { addVote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  const newVoteMutation = useMutation({mutationFn: addVote, 
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['anecdotes']})})
  
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  
  const handleVote = (anecdote) => {
    newVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }
  
  

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
