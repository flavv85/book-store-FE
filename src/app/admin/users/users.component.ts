import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/service/http-client.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: Array<User>;

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit() {
    this.httpClientService
      .getUsers()
      .subscribe((response) => this.handleSuccessfulResponse(response));
  }

  handleSuccessfulResponse(response) {
    this.users = response;
  }
}

// mock for testing purposes
// this.users = new Array<User>();
// const user1 = new User();
// user1.id = 1;
// user1.name = 'user1';
// user1.password = 'pass';
// user1.type = 'admin';

// const user2 = new User();
// user2.id = 1;
// user2.name = 'user2';
// user2.password = 'pass';
// user2.type = 'user';

// this.users.push(user1);
// this.users.push(user2);
