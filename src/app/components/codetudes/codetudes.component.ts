import { Component, OnInit } from '@angular/core';

import { Codetude } from '../../models/codetude.model';

import { CodetudeService } from '../../services/codetude.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-codetudes',
  templateUrl: './codetudes.component.html',
  styleUrls: ['./codetudes.component.css']
})
export class CodetudesComponent implements OnInit {
  codetudes: Codetude[];

  constructor(private codetudeService: CodetudeService, private authService: AuthService ) {}

  ngOnInit() {
    this.codetudeService.findAll().subscribe(codetudes => {
      this.codetudes = codetudes;
    });
  }

}
