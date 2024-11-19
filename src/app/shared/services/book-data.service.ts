import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCommonService } from './http-common.service';
import { Book } from './http-common.service';

@Injectable({
  providedIn: 'root',
})
export class BookDataService extends HttpCommonService<Book> {
  protected override resourceEndPoint = 'books';

  getAllBooks(): Observable<Book[]> {
    return this.getAll();
  }

  createBook(bookData: Book): Observable<Book> {
    return this.create(bookData);
  }

  getBookById(bookId: string): Observable<Book> {
    return this.get(bookId);
  }

  updateBook(bookId: string, bookData: Partial<Book>): Observable<Book> {
    return this.put(bookId, bookData);
  }
}
