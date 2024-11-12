import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SubscriptionPlansComponent } from './subscription-plans/subscription-plans.component';
import { BookDetailComponent } from './book-preview/book-detail/book-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LibraryComponent } from './library/library.component'
import { UploadBookComponent } from './upload-book/upload-book.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard], title: 'User Profile' },
  { path: 'book/:id', component: BookDetailComponent, canActivate: [AuthGuard], title: 'Book Preview' },
  { path: 'subscription', component: SubscriptionPlansComponent, canActivate: [AuthGuard], title: 'Subscription Plans' },
  { path: 'library', component: LibraryComponent, canActivate: [AuthGuard], title: 'Library' },
  { path: 'history', component: LibraryComponent, canActivate: [AuthGuard], title: 'History' },
  { path: 'uploaded-books', component: LibraryComponent, canActivate: [AuthGuard], title: 'Uploaded Books' },
  { path: 'saved-books', component: LibraryComponent, canActivate: [AuthGuard], title: 'Saved Books' },
  { path: 'upload-book', component: UploadBookComponent, canActivate: [AuthGuard], title: 'Upload Book' }
];
