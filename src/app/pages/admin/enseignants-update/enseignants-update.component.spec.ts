import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantsUpdateComponent } from './enseignants-update.component';

describe('EnseignantsUpdateComponent', () => {
  let component: EnseignantsUpdateComponent;
  let fixture: ComponentFixture<EnseignantsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnseignantsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
