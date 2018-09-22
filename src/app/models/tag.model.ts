export class Tag {
  id: number;
  name: string;
  created: Date;
  updated: Date;

  constructor (jsonTag: any) {
    this.id = jsonTag.id;
    this.name = jsonTag.name;
    this.created = jsonTag.created;
    this.updated = jsonTag.updated;
  }
}
