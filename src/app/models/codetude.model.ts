import { Tag } from './tag.model';
import { FilterFacet } from './filter-facet.model';
import { FilterFacetType } from '../enums/filter-facet-type';
import * as moment from 'moment';

export class Codetude {
  id: number;
  created: moment.Moment;
  updated: moment.Moment;
  started: moment.Moment;
  title: string;
  subtitle: string;
  description: string;
  sourceCodeLink: string;
  liveDemoLink: string;
  live: boolean;
  previewImageId: number;
  tags: Tag[];

  constructor(jsonCodetude: any) {
    // The dates from the api technically aren't UTC, but the UI pretends they are
    // Makes no difference so long as this is the only application consuming the api ¯\_(ツ)_/¯
    // I think I'd just have to modify the server to be UTC time.
    this.id = jsonCodetude.id;
    this.created = jsonCodetude.created
      ? moment.utc(jsonCodetude.created)
      : null;
    this.updated = jsonCodetude.updated
      ? moment.utc(jsonCodetude.updated)
      : null;
    this.started = jsonCodetude.started
      ? moment.utc(jsonCodetude.started)
      : null;
    this.title = jsonCodetude.title;
    this.subtitle = jsonCodetude.subtitle;
    this.description = jsonCodetude.description;
    this.sourceCodeLink = jsonCodetude.sourceCodeLink;
    this.liveDemoLink = jsonCodetude.liveDemoLink;
    this.live = jsonCodetude.live;
    this.previewImageId = jsonCodetude.previewImageId;
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
