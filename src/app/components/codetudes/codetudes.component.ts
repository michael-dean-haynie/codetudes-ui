import { Component, OnInit } from '@angular/core';

import { Codetude } from '../../models/codetude.model';

import { CodetudeService } from '../../services/codetude.service';

@Component({
  selector: 'app-codetudes',
  templateUrl: './codetudes.component.html',
  styleUrls: ['./codetudes.component.css']
})
export class CodetudesComponent implements OnInit {
  codetudes: Codetude[];

  constructor(private codetudeService: CodetudeService ) {}

  ngOnInit() {
    this.codetudeService.findAll().subscribe(codetudes => {
      this.codetudes = codetudes;
    });
  }

}
