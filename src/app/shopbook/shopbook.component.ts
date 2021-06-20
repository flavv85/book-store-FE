import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../Book';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-shopbook',
  templateUrl: './shopbook.component.html',
  styleUrls: ['./shopbook.component.css'],
})
export class ShopbookComponent implements OnInit {
  books: Array<Book>;
  booksReceived: Array<Book>;

  cartBooks: any;

  constructor(
    private router: Router,
    private httpClientService: HttpClientService
  ) {}

  ngOnInit(): void {
    this.httpClientService
      .getBooks()
      .subscribe((response) => this.successfulResponse(response));

    //  Web storage objects - localStorage and sessionStorage allow to save key/value pairs in the browser.
    //  The data survives a page refresh (for sessionStorage) and even a full browser restart (for localStorage).

    // retrive cart item from localstorage
    let data = localStorage.getItem('cart');
    // if this is not null convert it to JSON else initialize it as empty
    if (data !== null) {
      this.cartBooks = JSON.parse(data);
    } else {
      this.cartBooks = [];
    }
  }

  // take books response from the DB and add to the booksReceived
  successfulResponse(response) {
    this.books = new Array<Book>();
    this.booksReceived = response;

    for (const book of this.booksReceived) {
      const bookRetrieved = new Book();

      bookRetrieved.id = book.id;
      bookRetrieved.name = book.name;
      bookRetrieved.author = book.author;
      bookRetrieved.price = book.price;
      bookRetrieved.displayImg = 'data:image/jpeg;base64,' + book.picByte;
      bookRetrieved.picByte = book.picByte;
      this.books.push(bookRetrieved);
    }
  }

  addToCart(bookId) {
    // retrieve book from books array by id
    let book = this.books.find((book) => {
      return book.id === +bookId;
    });
    let cartData = [];
    // retrive cart data from localstorage
    let data = localStorage.getItem('cart');
    console.log('data ' + data);
    // parse it to JSon;
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    console.log('add selected book to cart data');
    // add selected book to cart data
    cartData.push(book);
    // update cartBooks
    this.updateCartData(cartData);
    // save updated cart data to localstorage;
    localStorage.setItem('cart', JSON.stringify(cartData));
    // confirm book is added to cart by setting isAdded to True
    book.isAdded = true;
  }

  updateCartData(cartData) {
    this.cartBooks = cartData;
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  emptyCart() {
    this.cartBooks = [];
    localStorage.clear();
  }
}
