import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaculteAddComponent } from './faculte-add.component';

describe('FaculteAddComponent', () => {
  let component: FaculteAddComponent;
  let fixture: ComponentFixture<FaculteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaculteAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaculteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
