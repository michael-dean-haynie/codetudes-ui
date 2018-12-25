import { Component, OnInit, ViewChild } from '@angular/core';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../models/tag.model';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  @ViewChild('deleteTagModal') deleteTagModal: ModalComponent;

  tags: Tag[];
  newTagName = '';

  tagToDelete: Tag = null;
  deleteTagModalHeaderText = '';
  deleteTagModalBodyText =
    'Deleting this tag will remove it from all existing Codetudes.';
  deleteTagModalConfirmText = 'Yes, Delete';
  deleteTagModalCancelText = 'Cancel';

  confirmedTagToDelete: Tag = null;

  constructor(private tagService: TagService) {}

  ngOnInit() {
    this.loadAllTags();
  }

  create(): void {
    this.tagService.create(this.newTagName).subscribe((respTag: Tag) => {
      this.tags.unshift(respTag);
      this.newTagName = '';
    });
  }

  private loadAllTags(): void {
    this.tagService.findAll().subscribe((tags: Tag[]) => {
      this.tags = tags;
    });
  }

  onTagDeleted(id: number): void {
    this.tags = this.tags.filter(tag => tag.id !== id);
  }

  onTagDeleteClicked(tag: Tag): void {
    this.tagToDelete = tag;
    this.deleteTagModalHeaderText = `Delete "${tag.name}" Tag?`;
    this.deleteTagModal.setHidden(false);
  }

  onDeleteTagModalDidConfirm(didConfirm: boolean): void {
    if (didConfirm) {
      this.confirmedTagToDelete = this.tagToDelete;
    }
  }
}
