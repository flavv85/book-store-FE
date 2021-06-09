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
    });
  }

  handleSuccessfulResponse(response) {
    this.books = response;
  }

  addBook() {
    this.selectedBook = new Book();
    this.router.navigate(['admin', 'books'], {
      queryParams: { action: 'add' },
    });
  }
}
