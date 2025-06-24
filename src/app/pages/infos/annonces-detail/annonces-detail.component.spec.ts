import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesDetailComponent } from './annonces-detail.component';

describe('AnnoncesDetailComponent', () => {
  let component: AnnoncesDetailComponent;
  let fixture: ComponentFixture<AnnoncesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnoncesDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnoncesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
