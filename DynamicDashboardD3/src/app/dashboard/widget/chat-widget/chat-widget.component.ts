import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dd-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent implements OnInit {
  
  chatHeader:string = 'Messanger';
  
  constructor() { }

  ngOnInit() {
  }

}
