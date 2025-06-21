import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliberationUpdateComponent } from './deliberation-update.component';

describe('DeliberationUpdateComponent', () => {
  let component: DeliberationUpdateComponent;
  let fixture: ComponentFixture<DeliberationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliberationUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliberationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
