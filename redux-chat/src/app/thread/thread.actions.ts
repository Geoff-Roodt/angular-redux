import { Action, ActionCreator } from 'redux';
import { uuid } from '../util/uuid';
import { Message } from '../message/message.model';
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';

/*
  This Type Script class sets up our Thread Actions.
  Actions are used to control specific interactions with the App State

  For each action (Add thread, add message and select thread):
    An Action is declared,
    An Interface is constructed handy
    An Action is executed, manipulating the Model State in the desired manner

    This is exactly the same as the User Actions, except there are several more.
*/

export const ADD_THREAD = '[Thread] Add';
export interface AddThreadAction extends Action{
  thread: Thread;
}
export const addThread: ActionCreator<AddThreadAction> = (thread) => ({
  type:ADD_THREAD,
  thread: thread
});

export const ADD_MESSAGE = '[Thread] Add Message';
export interface AddMessageAction extends Action{
  thread: Thread;
  message:Message;
}
export const addMessage: ActionCreator<AddMessageAction> = (thread: Thread, messageArgs: Message): AddMessageAction => {
  const defaults = {
    id: uuid(),
    sentAt: new Date(),
    isRead: false,
    thread: thread
  };
  const message: Message = Object.assign({}, defaults, messageArgs);
  return {type:ADD_MESSAGE, thread: thread, message: message};
};

export const SELECT_THREAD = '[Thread] Select';
export interface SelectorThreadAction extends Action{
  thread: Thread;
}
export const selectThread: ActionCreator<SelectorThreadAction> = (thread) => ({
  type: SELECT_THREAD,
  thread: thread
});
