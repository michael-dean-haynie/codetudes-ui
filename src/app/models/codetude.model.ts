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
  tags: Tag[];

  constructor(jsonCodetude: any) {
    this.id = jsonCodetude.id;
    this.created = jsonCodetude.created;
    this.updated = jsonCodetude.updated;
    this.started = jsonCodetude.started;
    this.finished = jsonCodetude.finished;
    this.title = jsonCodetude.title;
    this.subtitle = jsonCodetude.subtitle;
    this.description = jsonCodetude.description;
    this.sourceCodeLink = jsonCodetude.sourceCodeLink;
    this.liveDemoLink = jsonCodetude.liveDemoLink;
    this.tags = jsonCodetude.tags ? jsonCodetude.tags.map(jsonTag => new Tag(jsonTag)) : [];
  }

  //derrived
  buildDetailsPath(): string {
    return `/codetudes/${this.id}`;
  }

  matchesFacet(facet: FilterFacet): boolean {
    let result: boolean = false;

    if (facet.type === FilterFacetType.Text){
      result = this.title.toLowerCase().includes(facet.value.toLowerCase())
        || this.subtitle.toLowerCase().includes(facet.value.toLowerCase())
        || this.description.toLowerCase().includes(facet.value.toLowerCase())
        ;
        
      // opt
      if (result) { return result };
    }

    if (facet.type === FilterFacetType.Tag){
      result = this.tags.filter(tag => tag.name === facet.value).length > 0;

      // opt
      if (result) { return result };
    }

    return result;
  }
}
