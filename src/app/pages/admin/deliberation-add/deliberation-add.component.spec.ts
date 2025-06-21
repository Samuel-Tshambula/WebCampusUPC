import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliberationAddComponent } from './deliberation-add.component';

describe('DeliberationAddComponent', () => {
  let component: DeliberationAddComponent;
  let fixture: ComponentFixture<DeliberationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliberationAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliberationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
