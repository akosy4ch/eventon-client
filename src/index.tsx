import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createContext } from 'vm';


interface State {
  store: Store,
}
const store = new Store();

export const Context = createContext<State>({
  store,
})

ReactDOM.render(
  <Context.Provider value={{
    store
  }}>
    <App />

  </Context.Provider>,

  
  document.getElementById('root')
);



