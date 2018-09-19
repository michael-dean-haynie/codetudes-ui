import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisplayCodetude } from '../../models/display-codetude';
import { CodetudeService } from '../../services/codetude.service';
import { Codetude } from '../../models/codetude.model';

@Component({
  selector: 'app-codetude-detail',
  templateUrl: './codetude-detail.component.html',
  styleUrls: ['./codetude-detail.component.css']
})
export class CodetudeDetailComponent implements OnInit {
  codetude: DisplayCodetude;

  constructor(private route: ActivatedRoute, private codetudeService: CodetudeService) { }

  ngOnInit() {
    this.fetchCodetude();
  }

  private fetchCodetude(): void {
    const id: number = parseInt(this.route.snapshot.paramMap.get('id'));
    this.codetudeService.findOne(id).subscribe((codetude: Codetude) =>{
      this.codetude =  new DisplayCodetude(codetude);
    });
  }

}
