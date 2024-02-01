import { Component, OnInit } from '@angular/core';
import { Book } from '../model/books.model';
import { ConnectDBService } from '../services/connect-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Array<Book> = [];
  totalBooks: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  sizePage: number = 4;
  keyWord!: string;

  constructor(private service: ConnectDBService, private router: Router) {}

  ngOnInit(): void {
    this.getBooks();
  }

  public getBooks() {
    this.service
      .getBooksPaginate(this.keyWord, this.currentPage, this.sizePage)
      .subscribe({
        next: (data) => {
          this.books = <Array<Book>>data.body;
          this.totalBooks = parseInt(
            <string>data.headers.get('X-Total-Count')
          );
          this.totalPages = Math.floor(this.totalBooks / this.sizePage);
          if (this.totalBooks % this.sizePage != 0) ++this.totalPages;
        },
        error: (err) => {
          throw Error(err);
        },
      });
  }

  handleUpdateBook(prd: Book) {
    this.router.navigateByUrl(`/editBook/${prd.id}`);
  }

  handleDeleteBook(prd: Book) {
    this.service.deleteBook(prd).subscribe({
      next: (value) => {
        this.books = this.books.filter((p) => p.id != prd.id);
      },
      error: (err) => {
        throw Error(err);
      },
    });
  }

  handleSearchBook(keyWord: string) {
    this.currentPage = 1;
    this.totalBooks = 0;
    this.getBooks();
  }

  handleGoToPage(page: number) {
    this.currentPage = page;
    this.getBooks();
  }
}
