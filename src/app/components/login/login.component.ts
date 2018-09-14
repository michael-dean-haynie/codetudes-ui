import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = 'admin';
  password: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(): void {
    console.log("logging in");
    this.authService.login(this.username, this.password);
  }

  logout(): void {
    this.authService.logout();
  }



}
