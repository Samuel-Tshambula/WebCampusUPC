import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorairesAddComponent } from './horaires-add.component';

describe('HorairesAddComponent', () => {
  let component: HorairesAddComponent;
  let fixture: ComponentFixture<HorairesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorairesAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorairesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
