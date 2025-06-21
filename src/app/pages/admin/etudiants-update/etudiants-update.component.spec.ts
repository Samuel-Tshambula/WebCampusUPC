import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantsUpdateComponent } from './etudiants-update.component';

describe('EtudiantsUpdateComponent', () => {
  let component: EtudiantsUpdateComponent;
  let fixture: ComponentFixture<EtudiantsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
