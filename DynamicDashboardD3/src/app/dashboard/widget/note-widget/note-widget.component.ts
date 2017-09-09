import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { IWidgetComponent } from './../../../shared/interfaces';
import { DraggabillyDirective } from '../../../shared/draggabilly.directive';


@Component({
  selector: 'dd-note-widget',
  templateUrl: './note-widget.component.html',
  styleUrls: ['./note-widget.component.scss']
})
export class NoteWidgetComponent implements AfterViewInit, IWidgetComponent {

  id: number;
  editMode = false;
  chartType: string;
  data: string[][];
  columnWidth: number;
  destroy: () => void;
  @Input() displayHeader;
  @ViewChild(DraggabillyDirective) draggabillyDirective: DraggabillyDirective;

  constructor() { }

  ngAfterViewInit(): void {
    this.draggabillyDirective.onItemsReady('.dashboard');
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.draggabillyDirective.disable();
    } else {
      this.draggabillyDirective.enable();
    }
  }

  onDestroyClick() {
    this.destroy();
  }
}
