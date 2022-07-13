import {configureStore} from "@reduxjs/toolkit";
import {saveState} from "./localStorage";
import reducer from './redux/root-reducer'



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
