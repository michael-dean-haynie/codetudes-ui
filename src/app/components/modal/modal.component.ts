import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() headerText: string;
  @Input() bodyText: string;
  @Input() confirmText = 'Continue';
  @Input() cancelText = 'Cancel';

  @Output() didConfirm = new EventEmitter<boolean>();

  hidden = true;

  constructor() {}

  ngOnInit() {}

  setHidden(hidden: boolean) {
    this.hidden = hidden;
  }

  onConfirm(didConfirm: boolean) {
    this.setHidden(true);
    this.didConfirm.emit(didConfirm);
  }
}
