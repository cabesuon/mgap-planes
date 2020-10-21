import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaMapaComponent } from './vista-mapa.component';

describe('VistaMapaComponent', () => {
  let component: VistaMapaComponent;
  let fixture: ComponentFixture<VistaMapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VistaMapaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
