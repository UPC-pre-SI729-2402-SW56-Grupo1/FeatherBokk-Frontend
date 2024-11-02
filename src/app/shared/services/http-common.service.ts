import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  subscriptionLevel: string;
  booksHistory: { idBook: string; lastTimeRead: string }[];
  uploadedBooks: { idBook: string; uploadedDate: string }[];
  savedBooks: string[];
}
export interface Book {
  id: string;
  name: string;
  summary: string;
  category: string;
  bookurl: string;
  views: number;
  totalScore: number | null;
  reviews: { idUser: string; comment: string; score: number }[];
}

@Injectable({
  providedIn: 'root',
})
export class EventDataService {
  private apiUrl = 'https://672559c6c39fedae05b48fbf.mockapi.io/';
  private authTokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  generateId(length: number = 10): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random()   
   * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;   
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books`);
  }

  registerUser(userData: any): Observable<any> {
    const userId = this.generateId();
    const newUser = { ...userData, id: userId };
  
    return this.http.post(`${this.apiUrl}/users`, newUser);
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.getUsers().pipe(
      map((users) => {
        const user = users.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          localStorage.setItem(
            this.authTokenKey,
            JSON.stringify({ id: user.id })
          );
          return { success: true };
        } else {
          return { success: false, message: 'Invalid credentials' };
        }
      }),
      catchError((error) => of({ success: false, message: error.message }))
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  getAuthenticatedUser(): Observable<User | null> {
    const token = localStorage.getItem(this.authTokenKey);
    if (token) {
      const userId = JSON.parse(token).id;
      return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
    }
    return of(null);
  }

  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${bookId}`);
  }

  updateBook(bookId: string, data: Partial<Book>): Observable<any> {
    return this.http.put(`${this.apiUrl}/books/${bookId}`, data);
  }

  addBook(book: any, userId: string): Observable<any> {
    const bookId = this.generateId();
    const newBook = { ...book, id: bookId };
  
    return this.http.post(`${this.apiUrl}/books`, newBook).pipe(
      switchMap((createdBook: any) => {
        const uploadedBook = {
          idBook: createdBook.id,
          uploadedDate: this.formatDate(new Date())
        };
  
        return this.http.get<User>(`${this.apiUrl}/users/${userId}`).pipe(
          switchMap((user) => {
            const updatedUploadedBooks = [...user.uploadedBooks, uploadedBook];
            return this.http.put(`${this.apiUrl}/users/${userId}`, {
              ...user,
              uploadedBooks: updatedUploadedBooks
            });
          })
        );
      })
    );
  }

  addUploadedBookToUser(userId: string, bookId: string): Observable<any> {
    const uploadedBook = {
      idBook: bookId,
      uploadedDate: this.formatDate(new Date()),
    };

    return this.http.get<User>(`${this.apiUrl}/users/${userId}`).pipe(
      switchMap((user) => {
        const updatedUploadedBooks = [...user.uploadedBooks, uploadedBook];
        return this.http.put(`${this.apiUrl}/users/${userId}`, {
          uploadedBooks: updatedUploadedBooks,
        });
      })
    );
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  updateSubscriptionLevel(userId: string, newLevel: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, {
      subscriptionLevel: newLevel,
    });
  }
  updateUser(userId: string, data: Partial<User>): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, data);
  }

  logout() {
    localStorage.removeItem(this.authTokenKey);
  }
}
