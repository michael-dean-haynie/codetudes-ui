import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css'],
})
export class BackButtonComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onClick(): void {
    this.router.navigateByUrl('/codetudes');
  }
}
