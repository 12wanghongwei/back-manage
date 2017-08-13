import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownDemoComponent } from './drop-down-demo.component';

describe('DropDownDemoComponent', () => {
  let component: DropDownDemoComponent;
  let fixture: ComponentFixture<DropDownDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
