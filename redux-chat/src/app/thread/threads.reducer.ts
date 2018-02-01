import { Action } from 'redux';
import { createSelector } from 'reselect';

import { Thread } from './thread.model';
import { Message } from '../message/message.model';
import * as ThreadActions from './thread.actions';

export interface ThreadsEntities{
  [id:string]: Thread;
}

export interface ThreadsState{
  ids: string[];
  entities: ThreadsEntities;
  currentThreadId?: string;
};

const initialState: ThreadState = {
  ids: [],
  currentThreadId: null,
  entities: {}
};

export const ThreadsReducer = function(state: ThreadsState = initialState, action: Action): ThreadsState{
  switch(action.type){
    case ThreadActions.ADD_THREAD: {
      const thread = (<ThreadActions.AddThreadAction>action).thread;

      if (state.ids.includes(thread.id)){
        return state;
      }

      return {
        ids: [...state.ids, thread.id],
        currentThreadId: state.currentThreadId,
        entities: Object.assign({}, state.entities, {[thread.id]: thread})
      };
    }

    default:
      return state;
  }
}
