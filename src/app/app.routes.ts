import { Routes } from '@angular/router';
import { SubscriptionPlansComponent } from './subscription-plans/subscription-plans.component';
import { BookDetailComponent } from './book-preview/book-detail/book-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BookComponent } from './book/book.component';
import { ChatAutorComponent } from './chat-autor/chat-autor.component';
import { ForumComponent } from './forum/forum.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'perfil', component: UserProfileComponent },
  { path: 'libro-vista-previa', component: BookDetailComponent },
  { path: 'suscripcion', component: SubscriptionPlansComponent },
  { path: 'registrarse', component: RegisterComponent },
  { path: 'inicio-sesion', component: LoginComponent },
  { path: 'lectura', component: BookComponent },
  { path: 'foro', component: ForumComponent },
  { path: 'chat-con-autores', component: ChatAutorComponent },
  { path: '', component: HomeComponent }
];
