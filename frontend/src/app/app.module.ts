import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './features/product-list/product-list.component';
import { MyCartComponent } from './features/my-cart/my-cart.component';
import { HomeComponent } from './features/home/home.component';
import { HttpClientModule,HTTP_INTERCEPTORS, HttpClient  } from '@angular/common/http';
import { NavbarComponent } from './features/navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Form, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoInterceptor } from './interceptors/demo.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    MyCartComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //ToastrModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', 
      preventDuplicates: true,
      timeOut: 5000,
      closeButton: true,
      progressBar: true
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  providers: [
    HttpClientModule,
    { 
      provide: HTTP_INTERCEPTORS, useClass: DemoInterceptor, multi:true
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



