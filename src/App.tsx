import { useReducer, useEffect, useMemo } from 'react'
import Form from "./components/Form"
import { activityReducer, initialState } from './reducers/activity-reducer'
import ActivityLlist from './components/ActivityLlist'
import CalorieTracker from './components/CalorieTracker'

function App() {
  
  const [state, dispatch] = useReducer(activityReducer, initialState)
  
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])

  return (
    <>
      <header className="bg-black py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
           <h1 className="text-center text-lg font-bold text-white uppercase">
              Calorie Tracker
           </h1>

           <button 
              className="bg-red-700 hover:bg-red-800 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-50"
              disabled={!canRestartApp()}
              onClick={() => dispatch({type: 'restart-app'})}
            >
              Reiniciar App
           </button>
        </div>
      </header>

      <section className="bg-gray-900 py-20 px-5">
        <div className="max-w-4xl mx-auto">
            <Form 
                dispatch={dispatch}
                state={state}
            />
        </div>
      </section>
      
      
      <section className="bg-gray-800 py-10">

          <div className="max-w-4xl mx-auto">
             <CalorieTracker 
                activities={state.activities}
             />
          </div>
      </section>
      
      
      <section className="p-10 mx-auto max-w-4xl">
          <ActivityLlist 
              activities={state.activities}
              dispatch={dispatch}
          />
      </section>
    </>
  )
}

export default App
