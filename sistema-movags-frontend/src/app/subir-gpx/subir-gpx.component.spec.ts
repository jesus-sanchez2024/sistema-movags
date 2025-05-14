import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirGpxComponent } from './subir-gpx.component';

describe('SubirGpxComponent', () => {
  let component: SubirGpxComponent;
  let fixture: ComponentFixture<SubirGpxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirGpxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirGpxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
