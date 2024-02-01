import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConnectDBService } from '../services/connect-db.service';
import { Book } from '../model/books.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css'],
})
export class NewBookComponent implements OnInit {
  public bookForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ConnectDBService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: this.fb.control(''),
      price: this.fb.control(0),
      categorie: this.fb.control(''),
    });
  }

  handleSaveBook() {
    let book: Book = this.bookForm.value;
    this.service.saveBook(book).subscribe({
      next: (value) => {
        alert('success');
        this.router.navigateByUrl(`/book`);
      },
      error: (err) => {
        throw Error(err);
      },
    });
  }
}
