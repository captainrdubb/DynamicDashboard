import { CacheService } from './../../../shared/cache.service';
import { IWidgetComponent } from 'app/shared/interfaces';
import {
  Component, OnInit, ElementRef, ViewChild, AfterViewInit, ViewContainerRef
} from '@angular/core';
import { Message } from '../../../shared/interfaces';
import { DraggabillyDirective } from 'app/shared/draggabilly.directive';


@Component({
  selector: 'dd-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent implements OnInit, AfterViewInit, IWidgetComponent {

  destroy: () => void;
  columnWidth: number;
  data: string[][];

  userId = 1;
  messages: Message[];
  chatHeader = 'Messanger';
  @ViewChild('messageInput') messageInput: ElementRef;
  @ViewChild('chatWindow') chatWindow: ElementRef;
  @ViewChild(DraggabillyDirective) draggabillyDirective: DraggabillyDirective;
  private lastId = 1;

  constructor(private viewContainerRef: ViewContainerRef, cacheService: CacheService) {
  }

  ngOnInit() {
    const date = new Date();
    this.messages = [
      {
        fromId: this.lastId++,
        from: 'Joel Wills',
        to: 'Becky Wills',
        message: 'Today I went to a Greek festival with my wife Becky, ' +
        'my children, Honovi and Rani, and my frends OJ and Viverito. It was a lot of fun.',
        timeStamp: '8/23/2017 12:30:48 PM UTC'
      }
    ];
  }

  ngAfterViewInit() {
    this.draggabillyDirective.onItemsReady('.dashboard');
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 13 && !event.shiftKey) {
      const text = this.messageInput.nativeElement.innerText;
      this.messageInput.nativeElement.innerText = '';
      event.preventDefault();
      this.sendMessage(text);
      setTimeout(() => {
        this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
      }, 100);
    }
  }

  sendMessage(text: string) {
    const date = new Date();
    if (text) {
      const message = {
        fromId: this.lastId++,
        from: 'Becky Wills',
        to: 'Joel Wills',
        message: text,
        timeStamp: new Date().toUTCString()
      }
      this.messages.push(message);
    }
  }

  onDestroyClick() {
    this.destroy();
  }
}
