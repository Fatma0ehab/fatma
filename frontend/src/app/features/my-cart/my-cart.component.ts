import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { ProductService } from '../product-list/services/product.service';
import { OrderService } from './services/order.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';


@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  
  cartForm: FormGroup;
  totalPrice: number = 0;
  baseUrl: string = 'assets/';


  constructor(
    
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.cartForm = this.fb.group({
      cartItems: this.fb.array([]) 
    });
  }
 

  ngOnInit(): void {
    this.loadCart();
    
  }


  get cartItems(): FormArray {
    return this.cartForm.get('cartItems') as FormArray;
  }

  loadCart(): void {
    const cartItems = this.cartService.getCart();
    if (cartItems.length === 0) {
      this.toastr.info('Your cart is currently empty.');
      return;
    }

    cartItems.forEach(item => {
      this.productService.getProductById(item.productId).subscribe(
        (product: any) => {
          const itemGroup = this.fb.group({
            productId: [item.productId],
            quantity: [item.quantity],
            product: [product]
          });
          this.cartItems.push(itemGroup);
          this.calculateTotalPrice();
        },
        (error) => {
          console.error('Error fetching product:', error);
          const fallbackProduct = {
            name: 'Product not found',
            price: 0,
            imgUrl: 'default-image.png'
          };
          const itemGroup = this.fb.group({
            productId: [item.productId],
            quantity: [item.quantity],
            product: [fallbackProduct]
          });
          this.cartItems.push(itemGroup);
          this.toastr.error('Failed to fetch product details. Please try again.', 'Error');
          this.calculateTotalPrice();
        }
      );
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.controls.reduce((total, control) => {
      const item = control.value;
      return item.product ? total + (item.product.price * item.quantity) : total;
    }, 0);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems.clear();
    this.totalPrice = 0;
    this.toastr.info('Your cart has been cleared.', 'Cart Cleared');
  }

  resetCart(): void {
    this.cartService.clearCart();
    this.cartItems.clear();
    this.totalPrice = 0;
  }

  placeOrder(): void {
    if (this.cartItems.length === 0) {
      this.toastr.warning('Your cart is empty. Unable to place an order.', 'Warning');
      return;
    }

    this.orderService.placeOrder(this.cartItems.value).subscribe(
      (response) => {
        this.toastr.success('Your order has been placed successfully!', 'Order Success');
        this.resetCart();
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 2000);
      },
      (error) => {
        console.error('Error placing order:', error);
        this.toastr.error('There was a problem placing your order. Please try again later.', 'Order Error');
      }
    );
  }

  getProductImageUrl(imgUrl: string): string {
    return `${this.baseUrl}${imgUrl}`;
  }

  removeFromCart(productId: number): void {
    const index = this.cartItems.controls.findIndex(control => control.value.productId === productId);
    if (index !== -1) {
      this.cartItems.removeAt(index);
      this.cartService.removeFromCart(productId);
      this.calculateTotalPrice();
    }
  }
}
