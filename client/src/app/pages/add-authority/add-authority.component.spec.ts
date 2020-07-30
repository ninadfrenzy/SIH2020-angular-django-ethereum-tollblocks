import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuthorityComponent } from './add-authority.component';

describe('AddAuthorityComponent', () => {
  let component: AddAuthorityComponent;
  let fixture: ComponentFixture<AddAuthorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAuthorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
