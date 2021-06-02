import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private httpClientService: HttpClientService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addUser() {
    this.httpClientService.addUser(this.user).subscribe((user) => {
      this.router.navigate(['admin', 'users']);
    });
  }
}
