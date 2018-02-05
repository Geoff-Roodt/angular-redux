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

const initialState: ThreadsState = {
  ids: [],
  currentThreadId: null,
  entities: {}
};

/*
  Basically the Threads Reducer will manipulate the Threads State according to the Action that is needed to be performed.
  Since this reducer is rather complicated, and has alot of code that at first glance is rather heavy, I have commented the Users Reducer instead.

  The Users Reducer implements similar actions, and is more succinct with its notation. You will find more in-depth comments there.

*/

export const ThreadsReducer = function(state: ThreadsState = initialState, action: Action): ThreadsState{
  switch(action.type){
    case ThreadActions.ADD_THREAD: {
      const thread = (<ThreadActions.AddThreadAction>action).thread;

      if (state.ids.includes(thread.id)){
        return state;
      }

      // Return a Thread State with our select properties set
      return {
        ids: [...state.ids, thread.id],
        currentThreadId: state.currentThreadId,
        entities: Object.assign({}, state.entities, {[thread.id]: thread})
      };
    }

    // Basically we get our existing thread and messages, mark our current message as read, add a new one and return the lot.
    case ThreadActions.ADD_MESSAGE: {
      const thread = (<ThreadActions.AddMessageAction>action).thread;
      const message = (<ThreadActions.AddMessageAction>action).message;

      const isRead = message.thread.id === state.currentThreadId ? true: message.isRead;
      const newMessage = Object.assign({}, message, {isRead: isRead});
      const oldThread = state.entities[thread.id];
      const newThread = Object.assign({}, oldThread, {messages: [...oldThread.messages, newMessage]});

      return {
        ids: state.ids,
        currentThreadId: state.currentThreadId,
        entities: Object.assign({}, state.entities, {[thread.id]: newThread})
      };
    }

    // Get all the threads, copy it across as a reference to an old thread, create a new thread and messages off the old ones and return this new collection
    case ThreadActions.SELECT_THREAD: {
      const thread = (<ThreadActions.SelectorThreadAction>action).thread;
      const oldThread = state.entities[thread.id];

      const newMessages = oldThread.messages.map((message) => Object.assign({}, message, {isRead:true}));
      const newThread = Object.assign({}, oldThread, {messages: newMessages});

      return {
        ids: state.ids,
        currentThreadId: thread.id,
        entities: Object.assign({}, state.entities, {[thread.id]: newThread})
      };
    }

    default:
      return state;
  }
}

// Gets the current thread state
export const getThreadsState = (state): ThreadsState => state.threads;

// Gets all the messages associated with our thread
export const getThreadsEntities = createSelector(getThreadsState, (state: ThreadsState) => state.entities);

// Gets all threads for our user
export const getAllThreads = createSelector(getThreadsEntities, (entities: ThreadsEntities) => Object.keys(entities).map((threadId) => entities[threadId]));

// Increase the count if the message is marked as undread and is on our thread
export const getUnreadMessagesCount = createSelector(getAllThreads, (threads: Thread[]) => threads.reduce(
  (unreadCount: number, thread: Thread) => {
    thread.messages.forEach((message:Message) => {
      if (!message.isRead){
        ++unreadCount;
      }
    });
    return unreadCount;
  },
  0
));

// Gets our current thread- the thread is different to the thread state. The thread is and individual thread for a user, and the state is a collection of all threads for all users
export const getCurrentThread = createSelector(getThreadsEntities, getThreadsState, (entities: ThreadsEntities, state: ThreadsState) => entities[state.currentThreadId]);

// Gets all the messages for a particular thread
export const getAllMessages = createSelector(getAllThreads, (threads: Thread[]) => threads.reduce((messages, thread) => [...messages, ...thread.messages], []).sort((m1, m2) => m1.sentAt - m2.sentAt));
