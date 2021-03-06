import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../User';
import { Book } from '../book';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  // ---------- users service --------------

  getUsers() {
    return this.httpClient.get<User[]>('http://localhost:8080/users/get');
  }

  addUser(newUser: User) {
    return this.httpClient.post<User>(
      'http://localhost:8080/users/add',
      newUser
    );
  }

  deleteUser(id) {
    return this.httpClient.delete<User>('http://localhost:8080/users/' + id);
  }
  // ---------- books service --------------

  getBooks() {
    return this.httpClient.get<Book[]>('http://localhost:8080/books/get');
  }

  addBook(newBook: Book) {
    return this.httpClient.post<Book>(
      'http://localhost:8080/books/add',
      newBook
    );
  }

  deleteBook(id) {
    return this.httpClient.delete<Book>('http://localhost:8080/books/' + id);
  }

  updateBook(updatedBook: Book) {
    return this.httpClient.put<Book>(
      'http://localhost:8080/books/update',
      updatedBook
    );
  }
}
