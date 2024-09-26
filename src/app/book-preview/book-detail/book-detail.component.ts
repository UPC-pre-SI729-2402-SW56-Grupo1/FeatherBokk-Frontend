import { Component, OnInit } from '@angular/core';

import { RatingComponent } from '../rating/rating.component';
import { BookReviewsComponent } from '../book-reviews/book-reviews.component';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    RatingComponent,
    BookReviewsComponent
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {

  book = {
    title: 'El Bazar de los Malos Sueños',
    description: 'Una colección magistral de relatos cortos de Stephen King, donde lo cotidiano y lo macabro se mezclan para crear historias cautivadoras y perturbadoras.',
    imageUrl: 'https://images.cdn2.buscalibre.com/fit-in/360x360/f8/c1/f8c10cfe5cfe4e497e8765dba22150ce.jpg',
    rating: 8.9
  };

  constructor() { }

  ngOnInit(): void {
  }
}
