import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:7034/api/Order/place-order';

  constructor(private http: HttpClient) { }

  placeOrder(cartItems: any[]): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, cartItems)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    
    console.error(`An error occurred: ${error.status} ${error.statusText} - ${error.message}`);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}



