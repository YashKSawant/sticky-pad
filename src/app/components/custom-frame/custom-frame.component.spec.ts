import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFrameComponent } from './custom-frame.component';

describe('CustomFrameComponent', () => {
  let component: CustomFrameComponent;
  let fixture: ComponentFixture<CustomFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
