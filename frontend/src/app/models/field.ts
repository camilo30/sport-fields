export class Field {
  constructor(_id= '', name = '', desc = '', color = '', imagePath = '') {
    this._id  = _id;
    this.name = name;
    this.desc = desc;
    this.color = color;
    this.imagePath = imagePath;
  }
  _id: string;
  name: string;
  desc: string;
  color: string;
  imagePath: string;
}
