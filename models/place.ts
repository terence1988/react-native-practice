class Place {
  public id: string;
  public title: string;
  public imageUri?: string;
  constructor(id: string, title: string, imageUri?: string) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
  }
}

export default Place;
