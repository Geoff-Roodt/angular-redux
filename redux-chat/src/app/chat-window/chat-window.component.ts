import { Component, Inject, ElementRef } from '@angular/core';
import * as Redux from 'redux';
import {AppStore} from '../app.store';
import {AppState, getCurrentThread, getCurrentUser} from '../app.reducer';
import {User} from '../user/user.model';
import {Thread} from '../thread/thread.model';
import * as ThreadActions from '../thread/thread.actions';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent {
  currentThread: Thread;
  draftMessage: {text:string};
  currentUser: User;

  // We INJECT the AppStore as our store into Redux's Store property. This allows us to manipulate the Thread through Actions
  constructor(@Inject(AppStore) private store: Redux.Store<AppState>, private el: ElementRef) {
    store.subscribe(() => this.updateState());
    this.updateState();
    this.draftMessage = {text: ''};
  }

  // Gets and sets the current user and thread. Scrolls to the bottom of the thread automatically.
  updateState(){
    const state = this.store.getState();
    this.currentThread = getCurrentThread(state);
    this.currentUser = getCurrentUser(state);
    this.scrollToBottom();
  }

  // Moves to the bottom of the container for us.
  scrollToBottom(): void{
    const scrollPane: any = this.el.nativeElement.querySelector('.msg-container-base');
    if (scrollPane){
      setTimeout(() => scrollPane.scrollTop = scrollPane.scrollHeight);
    }
  }

  // Adds a message to the thread through a Thread Action. Sets the message to empty once it has completed that.
  sendMessage():void{
    this.store.dispatch(ThreadActions.addMessage(this.currentThread, {
      author: this.currentUser,
      isRead: true,
      text: this.draftMessage.text
    }));
    this.draftMessage = {text:''};
  }

  // Sends the message
  onEnter(event: any):void{
    this.sendMessage();
    event.preventDefault();
  }

}
