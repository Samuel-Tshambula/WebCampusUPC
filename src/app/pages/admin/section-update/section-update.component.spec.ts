import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionUpdateComponent } from './section-update.component';

describe('SectionUpdateComponent', () => {
  let component: SectionUpdateComponent;
  let fixture: ComponentFixture<SectionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
