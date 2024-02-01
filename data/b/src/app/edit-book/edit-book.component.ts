import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectDBService } from '../services/connect-db.service';
import { Book } from '../model/books.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  booksForm!: FormGroup;
  bookId: number;

  constructor(
    private fb: FormBuilder,
    private ar: ActivatedRoute,
    private service: ConnectDBService,
    private router: Router
  ) {
    this.bookId = this.ar.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.service.getBookById(this.bookId).subscribe({
      next: (data) => {
        this.booksForm = this.fb.group({
          id: [data.id],
          title: [data.title],
          price: [data.price],
          categorie: [data.categorie],
        });
      },
      error: (err) => {
        throw Error(err);
      },
    });
  }

  handleUpdateBook() {
    let book: Book = this.booksForm.value;
    this.service.updateBook(book).subscribe({
      next: (data) => {
        alert('updated');
        this.router.navigateByUrl(`/book`);
      },
      error: (err) => {
        throw Error(err);
      },
    });
  }
}
