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
}
