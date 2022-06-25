import { configureStore } from '@reduxjs/toolkit';
import { todosReducer } from '../features/todos/todosSlice';
import { userReducer } from '../features/user/userSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer
  },
});
