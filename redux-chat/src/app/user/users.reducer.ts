/*
  A Reducer is responsible for manipulating the Application State, but never overriding it. That is, it modifies it but never creates a new state.
*/

import { Action } from 'redux';
import { User } from './user.model';
import * as UserActions from './user.actions';
import { createSelector } from 'reselect';

// Declare our User State and setup our Current User
export interface UsersState{
  currentUser: User;
}

// Declare our Initial State- this will be manipulated
const initialState: UsersState = {
  currentUser: null
};

// Declare our User State
export const UsersReducer = function(state: UsersState = initialState, action: Action): UsersState{
  // Our Reducer will look at any action type and hand off to the matching action in the Users Action class, to manipulate our state
  switch (action.type){
    case UserActions.SET_CURRENT_USER:
      const user:User = (<UserActions.SetCurrentUserAction>action).user;
      return { currentUser: user };

    default:
      return state;
  }
};

// The constants just give us access to the user's state and the current user that has been selected. These are called externally
export const getUsersState = (state): UsersState => state.users;
export const getCurrentUser = createSelector(getUsersState, ( state: UsersState ) => state.currentUser );
