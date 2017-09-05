import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteWidgetComponent } from './note-widget.component';

describe('DisplayWidgetComponent', () => {
  let component: NoteWidgetComponent;
  let fixture: ComponentFixture<NoteWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
