import { Action } from 'redux';
import { User } from './user.model';
import * as UserActions from './user.actions';
import { createSelector } from 'reselect';

export interface UsersState{
  currentUser: User;
}

const initialState: UsersState = {
  currentUser: null
};
