import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationColorsComponent } from './application-colors.component';

describe('ApplicationColorsComponent', () => {
  let component: ApplicationColorsComponent;
  let fixture: ComponentFixture<ApplicationColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationColorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
