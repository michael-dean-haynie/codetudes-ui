import { Component, OnInit } from '@angular/core';
import { TagService } from '../../services/tag.service';
import { EditableTag } from '../../models/editable-tag.model';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: EditableTag[];

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.loadAllTags()
  }

  toggleEditMode(id: number): void{
    let tag: EditableTag = this.getTagById(id);
    tag.isInEditMode = !tag.isInEditMode;
  }

  discardChanges(id: number){
    let tag: EditableTag = this.getTagById(id);
    tag.src.name = tag.originalName;
    tag.isInEditMode = false;
  }

  acceptChanges(id: number): void {
    let tag: EditableTag = this.getTagById(id);
    tag.isInEditMode = false;

    let newTag: Tag = tag.src;
    this.tagService.update(newTag).subscribe((respTag: Tag) => {
      // replace old tag with new one from response
      let newTags: EditableTag[] = [];
      this.tags.forEach(t => newTags.push(t.src.id == respTag.id ? new EditableTag(respTag): t));
      this.tags = newTags;
    });
  }

  delete(id: number): void {
    this.tagService.delete(id).subscribe((respId: number) => {
      this.tags = this.tags.filter(t => t.src.id != respId);
    })
  }

  private loadAllTags(): void {
    this.tagService.findAll().subscribe((tags: Tag[]) => {
      this.tags = tags.map(tag => new EditableTag(tag));
    });
  }

  private getTagById(id: number): EditableTag {
    return this.tags.filter(t => t.src.id === id)[0];
  }

}
