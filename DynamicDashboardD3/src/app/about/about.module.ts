import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AboutComponent } from './about.component';
import { AboutContentComponent } from './about-content/about-content.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule
  ],
  exports: [AboutComponent],
  declarations: [AboutComponent, AboutContentComponent],
  entryComponents:[AboutContentComponent]
})
export class AboutModule { }
