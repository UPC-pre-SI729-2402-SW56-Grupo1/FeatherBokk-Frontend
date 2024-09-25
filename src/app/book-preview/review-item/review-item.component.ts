import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review-item',
  standalone: true,
  imports: [],
  templateUrl: './review-item.component.html',
  styleUrl: './review-item.component.css'
})
export class ReviewItemComponent {
  @Input() review!: { text: string, author: string };
}