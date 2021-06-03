import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/http-client.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
})
export class AdduserComponent implements OnInit {
  // This specifies that the user instance will be provided by the parent component to the add user child component whenever it gets called.
  @Input()
  user: User;

  // autorefresh parent class after a new user has been added
  @Output()
  userAddedEvent = new EventEmitter();

  newUser: User;
  message: string;
  password: string;

  constructor(
    private httpClientService: HttpClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newUser = Object.assign({}, this.user);
  }

  addUser() {
    this.httpClientService.addUser(this.user).subscribe((user) => {
      // if the user is successfully added then we send a signal to the parent users component
      this.userAddedEvent.emit();
      this.router.navigate(['admin', 'users']);
    });
  }
}
