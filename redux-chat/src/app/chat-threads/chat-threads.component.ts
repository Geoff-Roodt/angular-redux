import { Component, OnInit, Inject } from '@angular/core';
import {AppStore} from '../app.store';
import * as Redux from 'redux';
import {Thread} from '../thread/thread.model';
import * as ThreadActions from '../thread/thread.actions';
import {AppState, getCurrentThread, getAllThreads} from '../app.reducer';

@Component({
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {
  threads: Thread[];
  currentThreadId: string;

  constructor(@Inject(AppStore) private store: Redux.Store<AppState>) {
    store.subscribe(() => this.updateState());
    this.updateState();
  }

  // Leverages our Redux Store to remind itself of the current Application State
  updateState(){
    const state = this.store.getState();
    this.threads = getAllThreads(state);
    this.currentThreadId = getCurrentThread(state).id;
  }

  // This is how we invoke the Thread Selected ACTION, defined in Thread.Actions :)
  handleThreadClicked(thread: Thread){
    this.store.dispatch(ThreadActions.selectThread(thread));
  }

  ngOnInit() {
  }

}
