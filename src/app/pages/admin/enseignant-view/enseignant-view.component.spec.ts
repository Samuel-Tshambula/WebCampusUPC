import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantViewComponent } from './enseignant-view.component';

describe('EnseignantViewComponent', () => {
  let component: EnseignantViewComponent;
  let fixture: ComponentFixture<EnseignantViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnseignantViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
