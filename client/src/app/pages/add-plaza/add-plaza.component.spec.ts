import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlazaComponent } from './add-plaza.component';

describe('AddPlazaComponent', () => {
  let component: AddPlazaComponent;
  let fixture: ComponentFixture<AddPlazaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlazaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
