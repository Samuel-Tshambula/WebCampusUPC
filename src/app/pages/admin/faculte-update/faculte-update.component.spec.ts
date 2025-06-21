import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaculteUpdateComponent } from './faculte-update.component';

describe('FaculteUpdateComponent', () => {
  let component: FaculteUpdateComponent;
  let fixture: ComponentFixture<FaculteUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaculteUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaculteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
