import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventDataService, User } from '../shared/services/http-common.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-upload-book',
  standalone: true,
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.css'],
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
})
export class UploadBookComponent {
  bookForm: FormGroup;
  categories: string[] = ['Terror', 'Romance', 'Ciencia Ficción', 'Fantasía', 'Aventura'];
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: EventDataService,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      summary: ['', Validators.required],
      category: ['', Validators.required],
      bookurl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
    this.bookService.getAuthenticatedUser().subscribe((user) => {
      this.user = user;
    });
  }

  onSubmit() {
    if (this.bookForm.valid && this.user) {
      const newBook = {
        id: this.bookService.generateId(),
        name: this.bookForm.value.name,
        summary: this.bookForm.value.summary,
        category: this.bookForm.value.category,
        bookurl: this.bookForm.value.bookurl,
        views: this.generateRandomViews(),
        totalScore: 0,
        reviews: []
      };

      this.bookService.addBook(newBook, this.user.id).subscribe(() => {
        alert('Book uploaded successfully');
        this.router.navigate(['/uploaded-books']);
      });
    }
  }
  
  private generateRandomViews(): number {
    return Math.floor(Math.random() * 100);
  }
}
