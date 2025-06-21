import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePromotionEtudiantComponent } from './liste-promotion-etudiant.component';

describe('ListePromotionEtudiantComponent', () => {
  let component: ListePromotionEtudiantComponent;
  let fixture: ComponentFixture<ListePromotionEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListePromotionEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListePromotionEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
