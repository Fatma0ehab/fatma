import { Injectable } from '@angular/core';

interface CartItem {
  productId: number; 
  quantity: number;  
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = []; 

  constructor() { }

  
  addToCart(product: any): void {
    const existingProduct = this.cart.find(item => item.productId === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1; // Increment quantity if product already exists in cart
    } else {
      this.cart.push({ productId: product.id, quantity: 1 }); // Add new product with quantity 1
    }
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  
  setCart(newCart: CartItem[]): void {
    this.cart = newCart;
  }

  
  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.productId !== productId);
  }

  clearCart(): void {
    this.cart = [];
  }
}
