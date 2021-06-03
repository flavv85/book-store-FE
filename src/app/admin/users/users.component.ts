import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/http-client.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: Array<User>;
  selectedUser: User;
  action: string;

  // ActivatedRoute - Gives us access to the current route instance.
  // Router - using this we can navigate to another page.

  constructor(
    private httpClientService: HttpClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // function will fetch the user list from the Spring Boot Application
    this.refreshData();
  }

  refreshData() {
    this.httpClientService
      .getUsers()
      .subscribe((response) => this.handleSuccessfulResponse(response));

    // ActivatedRoute to get the current route parameters
    this.activatedRoute.queryParams.subscribe((params) => {
      this.action = params['action'];
    });
  }

  handleSuccessfulResponse(response) {
    this.users = response;
  }

  addUser() {
    this.selectedUser = new User();
    this.router.navigate(['admin', 'users'], {
      queryParams: { action: 'add' },
    });
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
