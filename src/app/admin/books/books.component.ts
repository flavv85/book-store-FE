import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/Book';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Array<Book>;
  booksReceived: Array<Book>;
  selectedBook: Book;
  action: string;

  // using the ActivatedRoute to check the current route parameters
  constructor(
    private httpClientService: HttpClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.httpClientService
      .getBooks()
      .subscribe((response) => this.handleSuccessfulResponse(response));

    this.activatedRoute.queryParams.subscribe((params) => {
      this.action = params['action'];

      // this will be the id of the book whose details are to be displayed when action is view.
      const bookId = params['id'];

      if (bookId) {
        this.selectedBook = this.selectedBook = this.books.find((book) => {
          return book.id === +bookId;
        });
      }
    });
  }
  // taking the books response returned from the database and we will be adding the answer retrieved
  handleSuccessfulResponse(response) {
    this.books = new Array<Book>();

    // get books returned by the api call
    this.booksReceived = response;
    for (const book of this.booksReceived) {
      const bookReceivedImgField = new Book();
      bookReceivedImgField.id = book.id;
      bookReceivedImgField.name = book.name;
      bookReceivedImgField.author = book.author;
      bookReceivedImgField.price = book.price;
      bookReceivedImgField.picByte = book.picByte;
      // populate retrieved image field so that book image can be displayed
      bookReceivedImgField.displayImg =
        'data:image/jpeg;base64,' + book.picByte;

      this.books.push(bookReceivedImgField);
    }
  }

  viewBook(id: number) {
    this.router.navigate(['admin', 'books'], {
      queryParams: { id, action: 'view' },
    });
  }

  addBook() {
    this.selectedBook = new Book();
    this.router.navigate(['admin', 'books'], {
      queryParams: { action: 'add' },
    });
  }
}
