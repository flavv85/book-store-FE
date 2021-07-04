import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './admin/books/books.component';
import { LandingPageBooksComponent } from './admin/books/landing-page-books/landing-page-books.component';
import { UsersComponent } from './admin/users/users.component';
import { CartComponent } from './shopbook/cart/cart.component';
import { ShopbookComponent } from './shopbook/shopbook.component';

const routes: Routes = [
  {
    path: 'admin/users',
    component: UsersComponent,
  },
  {
    path: 'admin/books',
    component: BooksComponent,
  },
  { path: 'shop', component: ShopbookComponent },
  { path: 'cart', component: CartComponent },
  { path: 'main', component: LandingPageBooksComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
