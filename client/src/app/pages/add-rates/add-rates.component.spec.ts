import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRatesComponent } from './add-rates.component';

describe('AddRatesComponent', () => {
  let component: AddRatesComponent;
  let fixture: ComponentFixture<AddRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
