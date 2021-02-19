import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSecanoComponent } from './chat-secano.component';

describe('ChatSecanoComponent', () => {
  let component: ChatSecanoComponent;
  let fixture: ComponentFixture<ChatSecanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatSecanoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSecanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
