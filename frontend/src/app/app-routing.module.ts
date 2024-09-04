import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/product-list/product-list.component';
import { MyCartComponent } from './features/my-cart/my-cart.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  {path: 'mycart', component: MyCartComponent},
  {path:'home', component:HomeComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
