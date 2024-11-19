import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, catchError } from 'rxjs';
import { environment } from '../../../environments/environment'

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
export class HttpCommonService<T> {
  protected basePath: string = `${environment.serverBasePath}`;
  protected resourceEndPoint: string = '';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`,
    }),
  };

  constructor(private http: HttpClient) {}

  generateId(length: number = 10): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  get(id: string): Observable<T> {
    return this.http
      .get<T>(`${this.basePath}/${this.resourceEndPoint}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAll(): Observable<T[]> {
    return this.http
      .get<T[]>(`${this.basePath}/${this.resourceEndPoint}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  create(item: T): Observable<T> {
    return this.http
      .post<T>(`${this.basePath}/${this.resourceEndPoint}`, item, this.httpOptions)
      .pipe(catchError(this.handleError));
  }


  post(endpoint: string, item: any): Observable<any> {
    return this.http
      .post<any>(`${this.basePath}/${this.resourceEndPoint}/${endpoint}`, item, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  put(id: string, item: Partial<T>): Observable<T> {
    return this.http
      .put<T>(`${this.basePath}/${this.resourceEndPoint}/${id}`, item, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.basePath}/${this.resourceEndPoint}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      console.error('Unauthorized request. Please login again.');
      alert('Unauthorized request. Please login again.');
    } else if (error.status === 403) {
      console.error('Access forbidden. You do not have permission to perform this action.');
      alert('Access forbidden. You do not have permission to perform this action.');
    } else {
      console.error(`An error occurred: ${error.message}`);
    }
    return throwError(() => new Error('An error occurred; please try again later.'));
  }
}
