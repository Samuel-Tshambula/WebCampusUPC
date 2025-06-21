import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantsAddComponent } from './enseignants-add.component';

describe('EnseignantsAddComponent', () => {
  let component: EnseignantsAddComponent;
  let fixture: ComponentFixture<EnseignantsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnseignantsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
