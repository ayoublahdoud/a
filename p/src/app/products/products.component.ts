import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ConnectDBService } from '../services/connect-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];
  totalProducts: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  sizePage: number = 4;
  keyWord!: string;

  constructor(private service: ConnectDBService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    this.service
      .getProductsPaginate(this.keyWord, this.currentPage, this.sizePage)
      .subscribe({
        next: (data) => {
          this.products = <Array<Product>>data.body;
          this.totalProducts = parseInt(
            <string>data.headers.get('X-Total-Count')
          );
          this.totalPages = Math.floor(this.totalProducts / this.sizePage);
          if (this.totalProducts % this.sizePage != 0) ++this.totalPages;
        },
        error: (err) => {
          throw Error(err);
        },
      });
  }

  handleUpdateProduct(prd: Product) {
    this.router.navigateByUrl(`/editProduct/${prd.id}`);
  }

  handleDeleteProduct(prd: Product) {
    this.service.deleteProduct(prd).subscribe({
      next: (value) => {
        this.products = this.products.filter((p) => p.id != prd.id);
      },
      error: (err) => {
        throw Error(err);
      },
    });
  }

  handleSearchProduct(keyWord: string) {
    this.currentPage = 1;
    this.totalProducts = 0;
    this.getProducts();
  }

  handleGoToPage(page: number) {
    this.currentPage = page;
    this.getProducts();
  }
}
