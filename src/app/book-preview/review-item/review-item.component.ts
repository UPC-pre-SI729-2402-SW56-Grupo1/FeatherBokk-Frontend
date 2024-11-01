import { Component, Input } from '@angular/core';

interface Review {
  username?: string;
  comment: string;
  score: number;
}

@Component({
  selector: 'app-review-item',
  standalone: true,
  imports: [],
  templateUrl: './review-item.component.html',
  styleUrl: './review-item.component.css'
})
export class ReviewItemComponent {
  @Input() review!: Review;
}