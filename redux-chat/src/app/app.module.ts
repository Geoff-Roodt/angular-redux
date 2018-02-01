import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppState, default as reducer} from './app.reducer';

import { AppComponent } from './app.component';
import {FromNowPipe} from './pipes/from-now.pipe';

import {AppStore, appStoreProviders} from './app.store';

@NgModule({
  declarations: [
    AppComponent,
    FromNowPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    appStoreProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
