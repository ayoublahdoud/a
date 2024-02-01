import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../model/books.model';

@Injectable({
  providedIn: 'root',
})
export class ConnectDBService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:5555/books');
  }
  getBooksPaginate(
    keyWord: string = '',
    page: number = 1,
    size: number = 4
  ) {
    return this.http.get<Book[]>(
      `http://localhost:5555/books?title_like=${keyWord}&_page=${page}&_limit=${size}`,
      { observe: 'response' }
    );
  }

  getBookByKeyWord(keyWord: string): Observable<Book[]> {
    return this.http.get<Book[]>(
      `http://localhost:5555/books?title_like=${keyWord}`
    );
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(
      `http://localhost:5555/books/${book.id}`,
      book
    );
  }

  deleteBook(prd: Book): Observable<any> {
    return this.http.delete(`http://localhost:5555/books/${prd.id}`);
  }

  saveBook(book: Book): Observable<Book> {
    return this.http.post<Book>('http://localhost:5555/books/', book);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`http://localhost:5555/books/${id}`);
  }
}
