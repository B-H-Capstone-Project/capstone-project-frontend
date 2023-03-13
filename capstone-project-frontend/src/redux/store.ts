import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './reducer/user';
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'; 

export const store = configureStore({
  reducer: authSlice.reducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 


