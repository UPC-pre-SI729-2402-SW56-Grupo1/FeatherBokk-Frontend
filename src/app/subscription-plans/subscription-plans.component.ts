import { Component, OnInit } from '@angular/core';
import { EventDataService, User } from '../shared/services/http-common.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-subscription-plans',
  standalone: true,
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css'],
  imports: [TranslateModule],
})
export class SubscriptionPlansComponent implements OnInit {
  subscriptionLevel: string = '';
  userId: string | null = null;

  constructor(private authService: EventDataService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authService.getAuthenticatedUser().subscribe((user: User | null) => {
      if (user) {
        this.subscriptionLevel = user.subscriptionLevel;
        this.userId = user.id;
      }
    });
  }

  changeSubscriptionLevel(level: string): void {
    if (this.userId) {
      this.authService.updateSubscriptionLevel(this.userId, level).subscribe(() => {
        this.subscriptionLevel = level;
        alert(`Subscription updated to Level ${level}`);
      });
    }
  }
}
