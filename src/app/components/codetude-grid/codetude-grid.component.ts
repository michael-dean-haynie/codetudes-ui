import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Codetude } from 'src/app/models/codetude.model';

@Component({
  selector: 'app-codetude-grid',
  templateUrl: './codetude-grid.component.html',
  styleUrls: ['./codetude-grid.component.css'],
})
export class CodetudeGridComponent implements OnInit {
  @Input() codetudes: Codetude[];

  @Output() codetudeClicked = new EventEmitter<Codetude>();

  constructor() {}

  ngOnInit() {}

  onCodetudeClicked(codetude: Codetude): void {
    this.codetudeClicked.emit(codetude);
  }
}
