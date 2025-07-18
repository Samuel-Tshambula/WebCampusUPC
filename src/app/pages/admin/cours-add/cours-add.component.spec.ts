import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursAddComponent } from './cours-add.component';

describe('CoursAddComponent', () => {
  let component: CoursAddComponent;
  let fixture: ComponentFixture<CoursAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
