import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
