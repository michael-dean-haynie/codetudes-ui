import { TagSortingService } from './../../services/tag-sorting.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditableCodetude } from '../../models/editable-codetude.model';
import { CodetudeService } from '../../services/codetude.service';
import { Codetude } from '../../models/codetude.model';
import { Tag } from '../../models/tag.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-codetude-detail',
  templateUrl: './codetude-detail.component.html',
  styleUrls: ['./codetude-detail.component.css'],
})
export class CodetudeDetailComponent implements OnInit {
  // to stop weird errors in template
  model: EditableCodetude = new EditableCodetude(new Codetude({}));
  userCanEdit = false;

  constructor(
    private route: ActivatedRoute,
    private codetudeService: CodetudeService,
    private authService: AuthService,
    private tagSortingService: TagSortingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userCanEdit = this.authService.userIsLoggedIn();
    this.fetchCodetude();
  }

  onFieldChanged() {
    // TODO: This is super non-performant. DB request every key stroke.
    this.saveChanges(this.model.src);
  }

  toggleEditMode(): void {
    this.model.isInEditMode = !this.model.isInEditMode;
  }

  onTagAdded(tag: Tag): void {
    const newCodetude = JSON.parse(JSON.stringify(this.model.src)); // copy
    newCodetude.tags.push(tag); // add tag
    this.saveChanges(newCodetude);
  }

  onTagRemoved(tag: Tag): void {
    const newCodetude = JSON.parse(JSON.stringify(this.model.src)); // copy
    newCodetude.tags = newCodetude.tags.filter(t => {
      return t.id !== tag.id;
    }); // remove tag
    this.saveChanges(newCodetude);
  }

  delete(): void {
    this.codetudeService.delete(this.model.src.id).subscribe((id: number) => {
      this.router.navigateByUrl('/codetudes');
    });
  }

  inEditMode(): boolean {
    return this.model && this.model.isInEditMode;
  }

  navigateToLiveDemoLink(): void {
    window.location.href = this.model.src.liveDemoLink;
  }

  navigateToSourceCodeLink(): void {
    window.location.href = this.model.src.sourceCodeLink;
  }

  private fetchCodetude(): void {
    const id: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.codetudeService.findOne(id).subscribe((codetude: Codetude) => {
      this.model = new EditableCodetude(codetude);
      this.sortTags();
      this.model.isInEditMode =
        this.route.snapshot.queryParams['edit'] === 'true';
    });
  }

  private saveChanges(codetude: Codetude): void {
    this.codetudeService.update(codetude).subscribe((ct: Codetude) => {
      this.model.src = ct;
      this.sortTags();
    });
  }

  private sortTags(): void {
    this.model.src.tags = this.tagSortingService.sortTags(this.model.src.tags);
  }
}
