import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.css'],
})
export class TagManagerComponent implements OnInit {
  @Input() model: Tag;

  @Output() tagDeleted = new EventEmitter<number>();

  private originalModel: Tag;
  editMode = false;

  constructor(private tagService: TagService) {}

  ngOnInit() {
    // stash a copy for discarding changes
    this.originalModel = { ...this.model };
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  delete(): void {
    this.tagService.delete(this.model.id).subscribe((respId: number) => {
      this.tagDeleted.emit(respId);
    });
  }

  acceptChanges(): void {
    this.editMode = false;

    this.tagService.update(this.model).subscribe((respTag: Tag) => {
      this.model = respTag;
      // stash a copy for discarding changes
      this.originalModel = { ...respTag };
    });
  }

  discardChanges() {
    // apply stashed original back to working model
    this.model = { ...this.originalModel };
    this.editMode = false;
  }
}
