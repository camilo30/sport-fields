export class Dni {
  constructor(_id= '', code = '', desc = '') {
    this._id  = _id;
    this.code = code;
    this.desc = desc;
  }
  _id: string;
  code: string;
  desc: string;
}
