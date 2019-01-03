export class Image {
  id: number;
  value: string;

  constructor(jsonImage: any) {
    this.id = jsonImage.id;
    this.value = jsonImage.value;
  }
}
