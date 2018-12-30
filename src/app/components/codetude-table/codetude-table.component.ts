import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Codetude } from 'src/app/models/codetude.model';

@Component({
  selector: 'app-codetude-table',
  templateUrl: './codetude-table.component.html',
  styleUrls: ['./codetude-table.component.css'],
})
export class CodetudeTableComponent implements OnInit {
  @Input() codetudes: Codetude[];

  @Output() codetudeClicked = new EventEmitter<Codetude>();

  constructor() {}

  ngOnInit() {}

  onCodetudeClicked(codetude: Codetude): void {
    this.codetudeClicked.emit(codetude);
  }
}
