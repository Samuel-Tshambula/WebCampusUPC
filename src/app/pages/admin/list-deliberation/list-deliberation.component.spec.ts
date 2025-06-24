import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeliberationComponent } from './list-deliberation.component';

describe('ListDeliberationComponent', () => {
  let component: ListDeliberationComponent;
  let fixture: ComponentFixture<ListDeliberationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDeliberationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDeliberationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
