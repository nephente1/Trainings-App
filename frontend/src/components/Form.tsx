import { useState } from 'react';
import { useWorkoutsContext } from './useWorkoutsContext';
import { useAuthContext } from './useAuthContext';

export const Form = () => {

  //@ts-ignore
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!user) {
      setError('You must log in')
      return
    }

    const workout = {title, load, reps }

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    console.log('json', json)

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields?.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
        className={emptyFields?.includes('load') ? 'error' : ''}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps}
        className={emptyFields?.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
