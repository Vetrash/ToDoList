/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import todoReduser from './todoSlice.js';

export default configureStore({
  reducer: {
    todo: todoReduser,
  },
});
