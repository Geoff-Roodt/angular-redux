// Improt all the great components from Redux (:
import {Reducer, combineReducers } from 'redux';

import {UsersState, UsersReducer } from './user/users.reducer';
export * from './user/users.reducer';

import { ThreadsState, ThreadsReducer } from './thread/threads.reducer';
export * from './thread/threads.reducer';

// The AppState will be used to maintain the application's model states; in this case, the state of our Users and Threads
export interface AppState {
 users: UsersState;
 threads: ThreadsState;
}

// Consume Redux's Reducer as a type of AppState; we combine two reducers into one for better access to code!
const rootReducer: Reducer<AppState> = combineReducers<AppState>({ users: UsersReducer, threads: ThreadsReducer });

export default rootReducer;
