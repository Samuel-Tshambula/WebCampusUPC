import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsUpdateComponent } from './promotions-update.component';

describe('PromotionsUpdateComponent', () => {
  let component: PromotionsUpdateComponent;
  let fixture: ComponentFixture<PromotionsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
