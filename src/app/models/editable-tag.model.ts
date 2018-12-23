import { Tag } from './tag.model';

export class EditableTag {
  src: Tag;
  originalName: string;
  isInEditMode = false;

  constructor(tag: Tag) {
    this.src = tag;
    this.originalName = tag.name;
  }

  isDirty(): boolean {
    return this.originalName !== this.src.name;
  }
}
