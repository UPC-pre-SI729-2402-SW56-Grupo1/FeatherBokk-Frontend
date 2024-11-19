import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCommonService, User } from './http-common.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService extends HttpCommonService<User> {
  protected override resourceEndPoint = 'users';

  getAuthenticatedUser(): Observable<User | null> {
    const token = this.getToken();
    if (token) {
      return this.get('me');
    }
    return new Observable((subscriber) => subscriber.next(null));
  }

  updateSubscriptionLevel(userId: string, level: string): Observable<any> {
    return this.put(userId, { id: userId, subscriptionLevel: level } as User);
  }

  registerUser(userData: any): Observable<any> {
    return this.post('register', userData);
  }

  loginUser(loginData: any): Observable<any> {
    return this.post('login', loginData);
  }

  updateUser(userId: string, updates: Partial<User>): Observable<User> {
    return this.put(userId, <User>updates);
  }

  getUserById(userId: string): Observable<User> {
    return this.get(userId);
  }
}
