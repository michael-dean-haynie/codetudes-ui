export class Tag {
  id: number;
  name: string;
  created: Date;
  updated: Date;

  constructor(jsonTag: any) {
    this.id = jsonTag.id;
    this.name = jsonTag.name;
    this.created = jsonTag.created ? jsonTag.created : null;
    this.updated = jsonTag.updated ? jsonTag.updated : null;
  }
}
