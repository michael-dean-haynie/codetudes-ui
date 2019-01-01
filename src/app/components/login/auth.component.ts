import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  username = 'admin';
  password: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  userIsLoggedIn(): boolean {
    return this.authService.userIsLoggedIn();
  }

  login(): void {
    this.authService.login(this.username, this.password);
  }

  logout(): void {
    this.authService.logout();
  }
}
