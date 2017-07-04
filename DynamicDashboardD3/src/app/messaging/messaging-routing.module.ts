import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagingComponent } from './messaging.component';

const routes: Routes = [
  { path: '', component: MessagingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagingRoutingModule {
  static components = [MessagingComponent];
}
