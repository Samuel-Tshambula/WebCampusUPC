import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionDeliberationComponent } from './promotion-deliberation.component';

describe('PromotionDeliberationComponent', () => {
  let component: PromotionDeliberationComponent;
  let fixture: ComponentFixture<PromotionDeliberationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionDeliberationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionDeliberationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
