// tslint:disable: variable-name
// {"id":1000,"first_name":"Red","last_name":"Danford","email":"rdanfordrr@mozilla.org","gender":"Agender","ip_address":"73.31.248.104"}

export class User {
  [propname: string]: any;
  id: number = 0;
  catID: number = 0;
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  gender: string = '';
  ip_address: string = '';
  featured: boolean = false;
}
