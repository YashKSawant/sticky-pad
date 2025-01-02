import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadTileComponent } from './pad-tile.component';

describe('PadTileComponent', () => {
  let component: PadTileComponent;
  let fixture: ComponentFixture<PadTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PadTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
