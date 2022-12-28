import { Injectable } from '@angular/core';
import Ajv from 'ajv';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  ajv = new Ajv({code: {esm: true}});
  constructor() { }

  validateSchema(schema: any, data: any): boolean {
    const validate = this.ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
      console.log(validate.errors);
    }
    return valid;
  }


}
