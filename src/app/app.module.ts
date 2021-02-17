import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SyncComponent } from './components/sync/sync.component';
import { AsyncComponent } from './components/async/async.component';
import { WsComponent } from './components/ws/ws.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'
import { AsyncStore } from './components/async/asyncstore';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SyncComponent,
    AsyncComponent,
    WsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AsyncStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
