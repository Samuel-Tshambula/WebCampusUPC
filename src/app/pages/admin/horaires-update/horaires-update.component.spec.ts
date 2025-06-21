import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorairesUpdateComponent } from './horaires-update.component';

describe('HorairesUpdateComponent', () => {
  let component: HorairesUpdateComponent;
  let fixture: ComponentFixture<HorairesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorairesUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorairesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
