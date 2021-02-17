import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsyncComponent } from './components/async/async.component';
import { HomeComponent } from './components/home/home.component';
import { SyncComponent } from './components/sync/sync.component';
import { WsComponent } from './components/ws/ws.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'sync',
    component: SyncComponent
  },
  {
    path: 'async',
    component: AsyncComponent
  },
  {
    path: 'ws',
    component: WsComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
