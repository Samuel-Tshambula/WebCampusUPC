import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionHoraireComponent } from './promotion-horaire.component';

describe('PromotionHoraireComponent', () => {
  let component: PromotionHoraireComponent;
  let fixture: ComponentFixture<PromotionHoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionHoraireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
