// Questions:
//   why won't my marker icons display?



import './App.css';
import Rail from './components/Rail';
import Mapp from './components/Mapp';
import { MaptContext, maptData } from './store/AppContext';
import { useReducer } from 'react';
import { maptReducer } from './reducers/maptReducer';


function App() {
  const [mapt, dispatch] = useReducer(maptReducer, maptData);
  

  return (
    <div className="App">
      <MaptContext.Provider value={{mapt,dispatch}}>
        <Rail />
        <Mapp />
      </MaptContext.Provider>
    </div>
  );
}

export default App;
