import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHoraireComponent } from './list-horaire.component';

describe('ListHoraireComponent', () => {
  let component: ListHoraireComponent;
  let fixture: ComponentFixture<ListHoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHoraireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
