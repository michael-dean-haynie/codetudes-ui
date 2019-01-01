import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SortMode } from 'src/app/enums/sort-mode';

@Component({
  selector: 'app-sort-icons',
  templateUrl: './sort-icons.component.html',
  styleUrls: ['./sort-icons.component.css'],
})
export class SortIconsComponent implements OnInit {
  @Input() sortMode: SortMode = null;

  SortMode = SortMode;

  constructor() {}

  ngOnInit() {}
}
