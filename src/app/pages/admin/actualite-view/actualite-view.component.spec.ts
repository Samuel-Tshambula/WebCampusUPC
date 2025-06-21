import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualiteViewComponent } from './actualite-view.component';

describe('ActualiteViewComponent', () => {
  let component: ActualiteViewComponent;
  let fixture: ComponentFixture<ActualiteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualiteViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualiteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
