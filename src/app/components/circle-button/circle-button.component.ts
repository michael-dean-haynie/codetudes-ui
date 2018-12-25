import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-circle-button',
  templateUrl: './circle-button.component.html',
  styleUrls: ['./circle-button.component.css'],
})
export class CircleButtonComponent implements OnInit {
  @Input() iconClass = 'pencil';

  constructor() {}

  ngOnInit() {}
}
