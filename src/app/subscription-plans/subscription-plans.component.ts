import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../shared/services/user-data.service';
import { User } from '../shared/services/http-common.service'
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

  constructor(private userService: UserDataService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getAuthenticatedUser().subscribe((user: User | null) => {
      if (user) {
        this.subscriptionLevel = user.subscriptionLevel;
        this.userId = user.id;
      }
    });
  }

  changeSubscriptionLevel(level: string): void {
    if (this.userId) {
      this.userService.updateSubscriptionLevel(this.userId, level).subscribe(() => {
        this.subscriptionLevel = level;
        alert(`Subscription updated to Level ${level}`);
      });
    }
  }
}
