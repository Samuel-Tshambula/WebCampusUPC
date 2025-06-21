import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantsAddComponent } from './etudiants-add.component';

describe('EtudiantsAddComponent', () => {
  let component: EtudiantsAddComponent;
  let fixture: ComponentFixture<EtudiantsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
