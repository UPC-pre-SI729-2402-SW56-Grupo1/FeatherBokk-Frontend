import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDataService, User } from '../../shared/services/http-common.service';
import { RatingComponent } from '../rating/rating.component';
import { BookReviewsComponent } from '../book-reviews/book-reviews.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Book {
  id: string;
  name: string;
  summary: string;
  category: string;
  bookurl: string;
  views: number;
  totalScore: number | null;
  reviews: { idUser: string; comment: string; score: number }[];
}

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    RatingComponent,
    BookReviewsComponent,
    TranslateModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book | null = null;
  user: User | null = null;
  newReview = { comment: '', score: null as number | null };

  constructor(
    private route: ActivatedRoute,
    private bookService: EventDataService
  ) {}

  checkScoreLimit() {
    if (this.newReview.score !== null && this.newReview.score > 10) {
      this.newReview.score = 10;
    }
  }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.loadBook(bookId);
    }

    this.bookService.getAuthenticatedUser().subscribe((user) => {
      this.user = user;
    });
  }

  loadBook(bookId: string) {
    this.bookService.getBookById(bookId).subscribe((book) => {
      this.book = book;
    });
  }

  submitReview() {
    if (this.book && this.user && this.newReview.score !== null) {
      const review = {
        idUser: this.user.id,
        comment: this.newReview.comment,
        score: this.newReview.score
      };
      
      this.book.reviews.push(review);

      const totalScore = this.book.reviews.reduce((sum, review) => sum + review.score, 0) / this.book.reviews.length;
      this.book.totalScore = parseFloat(totalScore.toFixed(2));

      this.bookService.updateBook(this.book.id, {
        reviews: this.book.reviews,
        totalScore: this.book.totalScore
      }).subscribe(() => {
        this.newReview = { comment: '', score: null };
      });
    }
  }

  readBook() {
    if (this.book?.bookurl) {
      window.open(this.book.bookurl, '_blank');
    }
  }
}
