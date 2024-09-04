import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { CartService } from '../my-cart/services/cart.service'; 

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  baseUrl: string = 'assets/';

  constructor(
    private productService: ProductService,
    private cartService: CartService 
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
        console.log('Fetched products:', this.products);
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getProductImageUrl(imgUrl: string): string {
    return `${this.baseUrl}${imgUrl}`;
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    console.log('Product added to cart:', product);
  }
}
