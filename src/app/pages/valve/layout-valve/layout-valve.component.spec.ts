import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutValveComponent } from './layout-valve.component';

describe('LayoutValveComponent', () => {
  let component: LayoutValveComponent;
  let fixture: ComponentFixture<LayoutValveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutValveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutValveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
