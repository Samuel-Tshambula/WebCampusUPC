import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosLayoutComponent } from './infos-layout.component';

describe('InfosLayoutComponent', () => {
  let component: InfosLayoutComponent;
  let fixture: ComponentFixture<InfosLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfosLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
