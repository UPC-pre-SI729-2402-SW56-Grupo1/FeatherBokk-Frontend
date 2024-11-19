import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewItemComponent } from '../review-item/review-item.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserDataService } from '../../shared/services/user-data.service';
import { User } from '../../shared/services/http-common.service';

interface Review {
  idUser: string;
  comment: string;
  score: number;
  username?: string;
}

@Component({
  selector: 'app-book-reviews',
  standalone: true,
  imports: [CommonModule, ReviewItemComponent, TranslateModule],
  templateUrl: './book-reviews.component.html',
  styleUrls: ['./book-reviews.component.css'],
})
export class BookReviewsComponent implements OnInit {
  @Input() reviews: Review[] = [];

  constructor(private userService: UserDataService) {}

  ngOnInit(): void {
    this.reviews.forEach((review) => {
      this.userService.getUserById(review.idUser).subscribe((user: User) => {
        review.username = user.username || '';
      });
    });
  }
}
