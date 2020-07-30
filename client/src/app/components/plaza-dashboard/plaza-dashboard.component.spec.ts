import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazaDashboardComponent } from './plaza-dashboard.component';

describe('PlazaDashboardComponent', () => {
  let component: PlazaDashboardComponent;
  let fixture: ComponentFixture<PlazaDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlazaDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlazaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
