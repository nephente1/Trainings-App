import {useEffect} from 'react';
import { ElementDetails } from '../components/ElementDetails';
import { Form } from '../components/Form';
import { useWorkoutsContext } from '../components/useWorkoutsContext';
import { useAuthContext } from '../components/useAuthContext';

export const Home = () => {
	// const [workouts, setWorkouts] = useState<any[]>([]);
//@ts-ignore
	const { workouts, dispatch } = useWorkoutsContext();
	const { context , user } = useAuthContext();

	console.log("context", context, user)

	useEffect(() => {
		const fetchWorkouts = async () => {
			const response = await fetch('/api/workouts', { 
				headers: {
					'Authorization': `Bearer ${user.token}`
				}
			});
			const json = await response.json();
			if(response.ok) {
				dispatch({type: 'SET_WORKOUTS', payload: json});
			}
		}
		if (user) {
			fetchWorkouts()
		}
		
	}, [dispatch, user])

	return (
		<>
			<h2>Home</h2>
			<div className="home">
				<div className="workouts">
					{workouts && workouts?.map((el: any) => 
						<ElementDetails key={el._id} workout={el}>{el.title}</ElementDetails>)}
				</div>
				<Form />
			</div>
		</>
	)
}
