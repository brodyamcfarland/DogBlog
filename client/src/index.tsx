import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, compose } from 'redux';
import {legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk';
import reducers from './reducers';

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
