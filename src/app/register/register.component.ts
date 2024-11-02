import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventDataService } from '../shared/services/http-common.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hidePassword: boolean = true;

  constructor(private router: Router, private eventDataService: EventDataService) {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const username = (form.querySelector('#username') as HTMLInputElement).value;
    const email = (form.querySelector('#email') as HTMLInputElement).value;
    const phone = (form.querySelector('#phone') as HTMLInputElement).value;
    const password = (form.querySelector('#password') as HTMLInputElement).value;

    const newUser = {
      id: this.eventDataService.generateId(),
      username,
      email,
      phone,
      password,
      subscriptionLevel: "1",
      booksHistory: [],
      uploadedBooks: [],
      savedBooks: []
    };

    this.eventDataService.registerUser(newUser).subscribe(response => {
      if (response) {
        this.router.navigate(['/login']);
      }
    });
  }
}
