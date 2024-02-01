import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ConnectDBService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:5555/products');
  }
  getProductsPaginate(
    keyWord: string = '',
    page: number = 1,
    size: number = 4
  ) {
    return this.http.get<Product[]>(
      `http://localhost:5555/products?name_like=${keyWord}&_page=${page}&_limit=${size}`,
      { observe: 'response' }
    );
  }

  getProductByKeyWord(keyWord: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:5555/products?name_like=${keyWord}`
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `http://localhost:5555/products/${product.id}`,
      product
    );
  }

  deleteProduct(prd: Product): Observable<any> {
    return this.http.delete(`http://localhost:5555/products/${prd.id}`);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:5555/products/', product);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:5555/products/${id}`);
  }
}
