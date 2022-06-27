import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {configureStore} from "@reduxjs/toolkit";
import {loadState, saveState} from "./localStorage";
import createRuleStateReducer from "./reducers/create-rule-reducer";
import reducer from './reducers/root-reducer'
import initialState from './initial-state'



const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {}
      }
    })
})

store.subscribe(() => {
  saveState({
    state: store.getState(),
  });
});


export default store
