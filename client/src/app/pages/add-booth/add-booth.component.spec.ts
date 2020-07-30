import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoothComponent } from './add-booth.component';

describe('AddBoothComponent', () => {
  let component: AddBoothComponent;
  let fixture: ComponentFixture<AddBoothComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBoothComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
