import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadEditorComponent } from './pad-editor.component';

describe('PadEditorComponent', () => {
  let component: PadEditorComponent;
  let fixture: ComponentFixture<PadEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PadEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
