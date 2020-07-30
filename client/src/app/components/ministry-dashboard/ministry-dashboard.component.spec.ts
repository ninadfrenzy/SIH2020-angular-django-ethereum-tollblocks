import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistryDashboardComponent } from './ministry-dashboard.component';

describe('MinistryDashboardComponent', () => {
  let component: MinistryDashboardComponent;
  let fixture: ComponentFixture<MinistryDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinistryDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
