export class Field {
  constructor(_id= '', name = '', desc = '', imagePath = '') {
    this._id  = _id;
    this.name = name;
    this.desc = desc;
    this.imagePath=imagePath;
  }
  _id: string;
  name: string;
  desc: string;
  imagePath: string;
}
