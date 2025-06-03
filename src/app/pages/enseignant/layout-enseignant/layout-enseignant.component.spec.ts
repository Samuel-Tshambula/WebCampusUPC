import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutEnseignantComponent } from './layout-enseignant.component';

describe('LayoutEnseignantComponent', () => {
  let component: LayoutEnseignantComponent;
  let fixture: ComponentFixture<LayoutEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutEnseignantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
