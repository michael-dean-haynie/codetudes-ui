import { Tag } from './tag.model';

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
    this.tags = jsonCodetude.tags.map(jsonTag => new Tag(jsonTag));
  }

  //derrived
  buildDetailsPath(): string {
    return `/codetudes/${this.id}`;
  }
}
