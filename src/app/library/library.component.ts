import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDataService, User } from '../shared/services/http-common.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

interface Book {
  id: string;
  name: string;
  summary: string;
  category: string;
  views: number;
  totalScore: number;
}

@Component({
  selector: 'app-library',
  standalone: true,
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  imports: [CommonModule, FormsModule, TranslateModule],
})
export class LibraryComponent implements OnInit {
  title: string = '';
  books: Book[] = [];
  filteredBooks: Book[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  searchQuery: string = '';
  user: User | null = null;
  categories: string[] = ['Terror', 'Romance', 'Ciencia Ficción', 'Fantasía', 'Aventura'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: EventDataService
  ) {}

  goToBookDetail(bookId: string) {
    this.router.navigate(['/book', bookId]);
  }

  ngOnInit(): void {
    this.setTitle();
    this.loadBooks();
  }

  setTitle() {
    const path = this.router.url;
    if (path === '/library') {
      this.title = 'Library';
    } else if (path === '/history') {
      this.title = 'History';
    } else if (path === '/uploaded-books') {
      this.title = 'Uploaded Books';
    } else if (path === '/saved-books') {
      this.title = 'Saved Books';
    }
  }

  loadBooks() {
    this.authService.getAuthenticatedUser().subscribe((user: User | null) => {
      this.user = user;

      if (this.title === 'Library') {
        this.authService.getBooks().subscribe((books: Book[]) => {
          this.books = books;
          this.filteredBooks = books;
        });
      } else if (this.title === 'History' && user) {
        const historyIds = user.booksHistory.map((book) => book.idBook);
        this.authService.getBooks().subscribe((books: Book[]) => {
          this.books = books.filter((book) => historyIds.includes(book.id));
          this.filteredBooks = this.books;
        });
      } else if (this.title === 'Uploaded Books' && user) {
        const uploadedIds = user.uploadedBooks.map((book) => book.idBook);
        this.authService.getBooks().subscribe((books: Book[]) => {
          this.books = books.filter((book) => uploadedIds.includes(book.id));
          this.filteredBooks = this.books;
        });
      } else if (this.title === 'Saved Books' && user) {
        const savedIds = user.savedBooks;
        this.authService.getBooks().subscribe((books: Book[]) => {
          this.books = books.filter((book) => savedIds.includes(book.id));
          this.filteredBooks = this.books;
        });
      }
    });
  }

  searchBooks() {
    this.filteredBooks = this.books.filter(book =>
      book.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 1;
  }

  saveBook(bookId: string) {
    if (this.user && !this.user.savedBooks.includes(bookId)) {
      this.user.savedBooks.push(bookId);
      this.authService.updateUser(this.user.id, { savedBooks: this.user.savedBooks }).subscribe();
    }
  }

  get paginatedBooks(): Book[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredBooks.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredBooks.length / this.itemsPerPage);
  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.filterByCategory(selectElement.value);
  }

  filterByCategory(category: string | null) {
    if (category) {
      this.filteredBooks = this.books.filter((book) => book.category === category);
    } else {
      this.filteredBooks = this.books;
    }
    this.currentPage = 1;
  }

  sortBy(field: string) {
    if (field === 'lastTimeRead' && this.user) {
      this.filteredBooks.sort((a, b) => {
        const aDate = this.user?.booksHistory.find((book) => book.idBook === a.id)?.lastTimeRead || '';
        const bDate = this.user?.booksHistory.find((book) => book.idBook === b.id)?.lastTimeRead || '';
        return new Date(bDate).getTime() - new Date(aDate).getTime();
      });
    } else if (field === 'uploadedDate' && this.user) {
      this.filteredBooks.sort((a, b) => {
        const aDate = this.user?.uploadedBooks.find((book) => book.idBook === a.id)?.uploadedDate || '';
        const bDate = this.user?.uploadedBooks.find((book) => book.idBook === b.id)?.uploadedDate || '';
        return new Date(bDate).getTime() - new Date(aDate).getTime();
      });
    }
  }
  
  removeBook(bookId: string) {
    if (this.user && this.user.savedBooks.includes(bookId)) {
        this.user.savedBooks = this.user.savedBooks.filter(id => id !== bookId);
        this.authService.updateUser(this.user.id, { savedBooks: this.user.savedBooks }).subscribe(() => {
            this.filteredBooks = this.filteredBooks.filter(book => book.id !== bookId);
        });
    }
}
}
