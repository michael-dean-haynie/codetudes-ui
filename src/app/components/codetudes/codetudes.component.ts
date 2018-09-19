import { Component, OnInit } from '@angular/core';

import { Codetude } from '../../models/codetude.model';

import { CodetudeService } from '../../services/codetude.service';
import { AuthService } from '../../services/auth.service';
import { DisplayCodetude } from '../../models/display-codetude';

@Component({
  selector: 'app-codetudes',
  templateUrl: './codetudes.component.html',
  styleUrls: ['./codetudes.component.css']
})
export class CodetudesComponent implements OnInit {
  codetudes: DisplayCodetude[];

  constructor(private codetudeService: CodetudeService, private authService: AuthService ) {}

  ngOnInit() {
    this.codetudeService.findAll().subscribe(codetudes => {
      this.codetudes = codetudes.map(codetude => new DisplayCodetude(codetude));
    });
  }

  // toggleEditMode(id: number): void {
  //   this.codetudes.forEach(codetude => {
  //     if (codetude.src.id === id) {
  //       codetude.isInEditMode = !codetude.isInEditMode;
  //     }
  //   });
  // }

}
