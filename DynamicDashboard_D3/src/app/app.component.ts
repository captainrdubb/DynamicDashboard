import { Component, ElementRef, AfterViewInit, Renderer } from '@angular/core';

@Component({
  selector: 'dd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  
  title = 'Dynamic Dashboard';

  constructor(private element:ElementRef, private renderer: Renderer){}

  ngAfterViewInit(): void {
    let exampleInput = this.element.nativeElement.querySelector('#example-input');
    this.renderer.invokeElementMethod(exampleInput, 'focus');
  }
}
