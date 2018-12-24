import { Component, OnInit } from '@angular/core';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  tags: Tag[];
  newTagName = '';

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
}
