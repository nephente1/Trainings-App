import { AppContext } from "../context/context";
import { useContext } from "react"

export const useWorkoutsContext = () => {
  const context = useContext(AppContext)

  if(!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}