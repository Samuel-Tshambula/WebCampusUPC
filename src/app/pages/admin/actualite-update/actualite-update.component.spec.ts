import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualiteUpdateComponent } from './actualite-update.component';

describe('ActualiteUpdateComponent', () => {
  let component: ActualiteUpdateComponent;
  let fixture: ComponentFixture<ActualiteUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualiteUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualiteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
