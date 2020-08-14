import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockchainDashboardComponent } from './blockchain-dashboard.component';

describe('BlockchainDashboardComponent', () => {
  let component: BlockchainDashboardComponent;
  let fixture: ComponentFixture<BlockchainDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockchainDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockchainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
