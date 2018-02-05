import { Action, ActionCreator } from 'redux';
import { User } from './user.model';

/**
  This Type Script class sets up our User Actions.
  Actions are used to control specific interactions with the App State

  First I have defined a constant that declares the object type, and the name of the action.
  Then I define the interface that we will leverage; it specifies a User variable which will come in handy for the execution of the action.
  Finally we define the action that will be executed; it takes a user object and identifies the action by the type flag (i.e. set current user) and then notes the user object should be our user object we pass in.
**/

export const SET_CURRENT_USER = '[User] Set Current';

export interface SetCurrentUserAction extends Action{
  user:User;
}

export const setCurrentUser: ActionCreator<SetCurrentUserAction> = (user) => ({
  type: SET_CURRENT_USER,
  user: user
});
