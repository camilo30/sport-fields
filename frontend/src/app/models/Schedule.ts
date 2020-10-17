import {Field} from './field';

export interface Schedule{
  start: string;
  end: string;
  available: boolean;
  field: Field;
}
