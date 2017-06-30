import { Component, ComponentFactoryResolver, AfterViewInit, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AboutContentComponent } from './about-content/about-content.component';

@Component({
  selector: 'dd-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {

  constructor(private modalService: NgbModal, private componentFactoryResolver: ComponentFactoryResolver) { }


  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
  }

  open() {
    const modalRef = this.modalService.open(AboutContentComponent);
    modalRef.componentInstance.name = 'About';
  }
};