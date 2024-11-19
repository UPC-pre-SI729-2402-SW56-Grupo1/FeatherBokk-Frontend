import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../shared/services/user-data.service';
import { User } from '../shared/services/http-common.service'
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [TranslateModule],
})
export class UserProfileComponent implements OnInit {
  username: string = '';
  email: string = '';
  phone: string = '';
  subscriptionLevel: string = '';

  constructor(private userService: UserDataService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getAuthenticatedUser().subscribe((user: User | null) => {
      if (user) {
        this.username = user.username;
        this.email = user.email;
        this.phone = user.phone;
        this.subscriptionLevel = user.subscriptionLevel;
      }
    });
  }
}
