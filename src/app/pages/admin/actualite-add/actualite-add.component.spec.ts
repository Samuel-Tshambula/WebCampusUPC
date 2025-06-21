import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualiteAddComponent } from './actualite-add.component';

describe('ActualiteAddComponent', () => {
  let component: ActualiteAddComponent;
  let fixture: ComponentFixture<ActualiteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualiteAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualiteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
