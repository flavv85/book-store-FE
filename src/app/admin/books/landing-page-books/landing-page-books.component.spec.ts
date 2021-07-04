import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageBooksComponent } from './landing-page-books.component';

describe('LandingPageBooksComponent', () => {
  let component: LandingPageBooksComponent;
  let fixture: ComponentFixture<LandingPageBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
