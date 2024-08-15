import { useWorkoutsContext } from "./useWorkoutsContext";
import { useAuthContext } from "./useAuthContext";
import { format } from 'date-fns'

export const ElementDetails = ({ workout }: any) => {

  //@ts-ignore
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
      'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  const date = new Date(workout.createdAt);
  const d = format(date, 'dd/MM/yyyy HH:mm')
  
  return (
    <div className="details">
      <h4>{workout.title}</h4>
      <p><b>Load: </b>{workout.load}</p>
      <p><b>Reps: </b>{workout.reps}</p>

      <p>{d}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}