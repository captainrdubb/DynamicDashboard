import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagingRoutingModule } from './messaging-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MessagingRoutingModule
  ],
  declarations: [MessagingRoutingModule.components]
})
export class MessagingModule { }
