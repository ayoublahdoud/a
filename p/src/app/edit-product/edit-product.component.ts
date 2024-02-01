import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectDBService } from '../services/connect-db.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  productId: number;

  constructor(
    private fb: FormBuilder,
    private ar: ActivatedRoute,
    private service: ConnectDBService,
    private router: Router
  ) {
    this.productId = this.ar.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.service.getProductById(this.productId).subscribe({
      next: (data) => {
        this.productForm = this.fb.group({
          id: [data.id],
          name: [data.name],
          price: [data.price],
          category: [data.category],
        });
      },
      error: (err) => {
        throw Error(err);
      },
    });
  }

  handleUpdateProduct() {
    let product: Product = this.productForm.value;
    this.service.updateProduct(product).subscribe({
      next: (data) => {
        alert('updated');
        this.router.navigateByUrl(`/products`);
      },
      error: (err) => {
        throw Error(err);
      },
    });
  }
}
