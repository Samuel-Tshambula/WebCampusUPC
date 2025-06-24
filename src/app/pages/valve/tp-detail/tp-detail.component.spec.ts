import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpDetailComponent } from './tp-detail.component';

describe('TpDetailComponent', () => {
  let component: TpDetailComponent;
  let fixture: ComponentFixture<TpDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
