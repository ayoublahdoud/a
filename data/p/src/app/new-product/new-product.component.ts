import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConnectDBService } from '../services/connect-db.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  public productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ConnectDBService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: this.fb.control(''),
      price: this.fb.control(0),
      category: this.fb.control(''),
    });
  }

  handleSaveProduct() {
    let product: Product = this.productForm.value;
    this.service.saveProduct(product).subscribe({
      next: (value) => {
        alert('success');
        this.router.navigateByUrl(`/products`);
      },
      error: (err) => {
        throw Error(err);
      },
    });
  }
}
