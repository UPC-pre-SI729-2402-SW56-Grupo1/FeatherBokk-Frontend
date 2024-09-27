import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewItemComponent } from '../review-item/review-item.component';

@Component({
  selector: 'app-book-reviews',
  standalone: true,
  imports: [
    CommonModule,
    ReviewItemComponent
  ],
  templateUrl: './book-reviews.component.html',
  styleUrl: './book-reviews.component.css'
})
export class BookReviewsComponent implements OnInit {

  reviews = [
    { text: 'Me gustó mucho', author: 'Usuario 1' },
    { text: 'Me encanta como se desarrollan las historias', author: 'Usuario 2' },
    { text: 'Logró hacerme sentir miedo', author: 'Usuario 3' },
    { text: 'El mejor libro que leí', author: 'Usuario 4' },
    { text: 'Qué buen libro', author: 'Usuario 5' },
  ];

  constructor() { }
  
  ngOnInit(): void {
  }

}
