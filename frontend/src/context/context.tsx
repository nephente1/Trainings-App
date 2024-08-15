import { createContext, useReducer } from 'react';



export const AppContext = createContext({});
export const workoutsReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      }
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      }
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }

}

export const AppContextProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null
  })


  return (//@ts-ignore
    <AppContext.Provider value={{...state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}