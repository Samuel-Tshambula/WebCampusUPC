import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsAddComponent } from './promotions-add.component';

describe('PromotionsAddComponent', () => {
  let component: PromotionsAddComponent;
  let fixture: ComponentFixture<PromotionsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
