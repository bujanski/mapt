// Questions:
//   why won't my marker icons display?



import './App.css';
import Rail from './components/Rail';
import Mapp from './components/Mapp';
import { MaptContext, maptData } from './store/MaptContext';
import { useReducer } from 'react';
import { maptReducer } from './reducers/maptReducer';


function App() {
  const [state, dispatch] = useReducer(maptReducer, maptData);

  return (
    <div className="App">
      <MaptContext.Provider value={{state,dispatch}}>
        <Rail />
        <Mapp />
      </MaptContext.Provider>
    </div>
  );
}

export default App;
