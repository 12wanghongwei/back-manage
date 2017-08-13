import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownComponentComponent } from './drop-down-component.component';

describe('DropDownComponentComponent', () => {
  let component: DropDownComponentComponent;
  let fixture: ComponentFixture<DropDownComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
