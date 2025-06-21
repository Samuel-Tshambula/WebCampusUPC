import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursViewComponent } from './cours-view.component';

describe('CoursViewComponent', () => {
  let component: CoursViewComponent;
  let fixture: ComponentFixture<CoursViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
