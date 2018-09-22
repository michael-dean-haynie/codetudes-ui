import { Tag } from './tag.model';

export class EditableTag {
  src: Tag;
  originalName: string;
  isInEditMode: boolean = false;

  constructor(tag: Tag) {
    this.src = tag;
    this.originalName = tag.name;
  }

  isDirty(): boolean {
      return this.originalName != this.src.name;
  }
}
