import { Codetude } from './codetude.model';

export class DisplayCodetude {
  src: Codetude;
  isInEditMode: boolean = false;
  detailsUrl: String;

  constructor(codetude: Codetude) {
    this.src = codetude;
    this.detailsUrl = `/codetudes/${codetude.id}`;
  }
}
