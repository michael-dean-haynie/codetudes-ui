import { Codetude } from './codetude.model';

export class EditableCodetude {
  src: Codetude;
  isInEditMode = false;

  constructor(codetude: Codetude) {
    this.src = codetude;
  }
}
