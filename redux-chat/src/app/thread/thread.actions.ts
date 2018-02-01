import { Action, ActionCreator } from 'redux';
import { uuid } from '../util/uuid';
import { Message } from '../message/message.model';
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';

export const ADD_THREAD = '[Thread] Add';
export interface AddThreadAction extends Action{
  thread: Thread;
}

export const addThread: ActionCreator<AddThreadAction> = (thread) => ({
  type:ADD_THREAD,
  thread: thread
});
