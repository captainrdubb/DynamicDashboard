import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
