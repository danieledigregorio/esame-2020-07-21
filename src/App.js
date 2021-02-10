import 'react-big-calendar/lib/css/react-big-calendar.css'
import './App.css';
import Home from './Home'
import {createContext, useReducer} from "react";
import {Reducer, initialState} from "./Reducer";

export const StateContext = createContext()

function App() {

    return (
        <StateContext.Provider value={useReducer(Reducer, initialState)}>
            <div className="App">
                <Home />
            </div>
        </StateContext.Provider>
    );
}

export default App;
