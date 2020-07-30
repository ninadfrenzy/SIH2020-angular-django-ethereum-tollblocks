import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothDashboardComponent } from './booth-dashboard.component';

describe('BoothDashboardComponent', () => {
  let component: BoothDashboardComponent;
  let fixture: ComponentFixture<BoothDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoothDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
