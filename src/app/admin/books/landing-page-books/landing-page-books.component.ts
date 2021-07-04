import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/Book';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-landing-page-books',
  templateUrl: './landing-page-books.component.html',
  styleUrls: ['./landing-page-books.component.css'],
})
export class LandingPageBooksComponent implements OnInit {
  books: Array<Book>;
  booksReceived: Array<Book>;

  constructor(
    private router: Router,
    private httpClientService: HttpClientService
  ) {}

  ngOnInit(): void {
    this.httpClientService
      .getBooks()
      .subscribe((response) => this.successfulResponse(response));
  }

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
}
