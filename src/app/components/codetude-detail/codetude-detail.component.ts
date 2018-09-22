import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableCodetude } from '../../models/editable-codetude.model';
import { CodetudeService } from '../../services/codetude.service';
import { Codetude } from '../../models/codetude.model';
import { Tag } from '../../models/tag.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-codetude-detail',
  templateUrl: './codetude-detail.component.html',
  styleUrls: ['./codetude-detail.component.css']
})
export class CodetudeDetailComponent implements OnInit {
  model: EditableCodetude;
  userCanEdit: boolean = false;

  constructor(private route: ActivatedRoute, private codetudeService: CodetudeService, private authService: AuthService) { }

  ngOnInit() {
    this.userCanEdit = this.authService.userIsLoggedIn();
    this.fetchCodetude();
  }

  toggleEditMode(): void {
    this.model.isInEditMode = !this.model.isInEditMode;
  }

  onTagAdded(tag: Tag): void {
    let newCodetude = JSON.parse(JSON.stringify(this.model.src)); // copy
    newCodetude.tags.push(tag); // add tag
    this.codetudeService.update(newCodetude).subscribe((codetude: Codetude) => {
      this.model.src = codetude;
    });
  }

  onTagRemoved(tag: Tag): void {
    let newCodetude = JSON.parse(JSON.stringify(this.model.src)); // copy
    newCodetude.tags = newCodetude.tags.filter(t => {return t.id != tag.id}); // remove tag
    this.codetudeService.update(newCodetude).subscribe((codetude: Codetude) => {
      this.model.src = codetude;
    });
  }

  private fetchCodetude(): void {
    const id: number = parseInt(this.route.snapshot.paramMap.get('id'));
    this.codetudeService.findOne(id).subscribe((codetude: Codetude) =>{
      this.model =  new EditableCodetude(codetude);
    });
  }

}
