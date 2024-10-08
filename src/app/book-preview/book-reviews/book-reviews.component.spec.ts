import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReviewsComponent } from './book-reviews.component';

describe('BookReviewsComponent', () => {
  let component: BookReviewsComponent;
  let fixture: ComponentFixture<BookReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
