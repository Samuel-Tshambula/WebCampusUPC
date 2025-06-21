import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesAddComponent } from './annonces-add.component';

describe('AnnoncesAddComponent', () => {
  let component: AnnoncesAddComponent;
  let fixture: ComponentFixture<AnnoncesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnoncesAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnoncesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
