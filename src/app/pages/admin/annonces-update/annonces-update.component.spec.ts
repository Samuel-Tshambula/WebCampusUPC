import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesUpdateComponent } from './annonces-update.component';

describe('AnnoncesUpdateComponent', () => {
  let component: AnnoncesUpdateComponent;
  let fixture: ComponentFixture<AnnoncesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnoncesUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnoncesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
