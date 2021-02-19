import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanChatComponent } from './plan-chat.component';

describe('PlanChatComponent', () => {
  let component: PlanChatComponent;
  let fixture: ComponentFixture<PlanChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanChatComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
