import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/Book';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-viewbook',
  templateUrl: './viewbook.component.html',
  styleUrls: ['./viewbook.component.css'],
})
export class ViewbookComponent implements OnInit {
  @Input()
  book: Book;

  @Output()
  bookDelEvent = new EventEmitter();

  constructor(
    private httpClientService: HttpClientService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  deleteBook() {
    this.httpClientService.deleteBook(this.book.id).subscribe((book) => {
      this.bookDelEvent.emit();
      console.log('book cu id-ul: ' + this.book.id + ' a fost stearsa!');
      this.router.navigate(['admin', 'books']);
    });
  }
}
