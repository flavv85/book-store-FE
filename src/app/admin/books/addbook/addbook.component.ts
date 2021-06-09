import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/book';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
})
export class AddbookComponent implements OnInit {
  @Input()
  book: Book;

  @Output()
  bookAddedEvent = new EventEmitter();

  private selectedFile;
  imgURL: any;

  constructor(
    private httpClientService: HttpClientService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {}

  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    // will first be saving the image. If the image has been successfully saved we will then be saving the other book details

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  saveBook() {
    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;

    this.httpClient
      .post('http://localhost:8080/books/upload', uploadData, {
        observe: 'response',
      })
      .subscribe((response) => {
        if (response.status === 200) {
          this.httpClientService.addBook(this.book).subscribe((book) => {
            this.bookAddedEvent.emit();
            this.router.navigate(['admin', 'books']);
          });
          console.log('Image uploaded!');
        } else {
          console.log('Error uploading image!');
        }
      });
  }
}
