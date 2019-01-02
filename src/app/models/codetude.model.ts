import { Tag } from './tag.model';
import { FilterFacet } from './filter-facet.model';
import { FilterFacetType } from '../enums/filter-facet-type';

export class Codetude {
  id: number;
  created: Date;
  updated: Date;
  started: Date;
  finished: Date;
  title: string;
  subtitle: string;
  description: string;
  sourceCodeLink: string;
  liveDemoLink: string;
  live: boolean;
  previewImage: string;
  tags: Tag[];

  constructor(jsonCodetude: any) {
    this.id = jsonCodetude.id;
    this.created = jsonCodetude.created ? new Date(jsonCodetude.created) : null;
    this.updated = jsonCodetude.updated ? new Date(jsonCodetude.updated) : null;
    this.started = jsonCodetude.started ? new Date(jsonCodetude.started) : null;
    this.finished = jsonCodetude.finished
      ? new Date(jsonCodetude.finished)
      : null;
    this.title = jsonCodetude.title;
    this.subtitle = jsonCodetude.subtitle;
    this.description = jsonCodetude.description;
    this.sourceCodeLink = jsonCodetude.sourceCodeLink;
    this.liveDemoLink = jsonCodetude.liveDemoLink;
    this.live = jsonCodetude.live;
    this.previewImage = jsonCodetude.previewImage;
    this.tags = jsonCodetude.tags
      ? jsonCodetude.tags.map(jsonTag => new Tag(jsonTag))
      : [];
  }

  // derrived
  buildDetailsPath(): string {
    return `/codetudes/${this.id}`;
  }

  matchesFacet(facet: FilterFacet): boolean {
    let result = false;

    if (facet.type === FilterFacetType.Text) {
      result =
        (this.title &&
          this.title.toLowerCase().includes(facet.value.toLowerCase())) ||
        (this.subtitle &&
          this.subtitle.toLowerCase().includes(facet.value.toLowerCase())) ||
        (this.description &&
          this.description.toLowerCase().includes(facet.value.toLowerCase()));

      // opt
      if (result) {
        return result;
      }
    }

    if (facet.type === FilterFacetType.Tag) {
      result = this.tags && this.tags.some(tag => tag.name === facet.value);

      // opt
      if (result) {
        return result;
      }
    }

    return result;
  }
}
