import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  list: User[] = [
    {
      id: 1,
      catID: 1,
      first_name: 'József',
      last_name: 'Cserkó',
      email: 'j.cserko@cserko.hu',
      gender: 'male',
      ip_address: '128.25.145.22',
      featured: true,
    },
    {
      id: 2,
      catID: 2,
      first_name: 'Lídia',
      last_name: 'Cserkó',
      email: 'j.cserko@cserko.hu',
      gender: 'male',
      ip_address: '128.25.145.22',
      featured: false,
    },
    {
      id: 3,
      catID: 2,
      first_name: 'Krisztián',
      last_name: 'Cserkó',
      email: 'j.cserko@cserko.hu',
      gender: 'male',
      ip_address: '128.25.145.22',
      featured: true,
    },
  ];


  apiUrl: string = 'http://localhost:3000/users';

  // State.
  list$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(
    private http: HttpClient,
  ) {}

  /**
   * Get all users from the server.
   */
  getAll(): void {
    this.http.get<User[]>(this.apiUrl).subscribe(
      users => this.list$.next(users)
    );
  }

  get(user: User): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${user.id}`);
  }

  create(user: User): void {
    this.http.post<User>(this.apiUrl, user).subscribe(
      () => this.getAll()
    );
  }

  update(user: User): void {
    this.http.patch<User>(`${this.apiUrl}/${user.id}`, user).subscribe(
      () => this.getAll()
    );
  }

  remove(user: User): void {
    this.http.delete<User>(`${this.apiUrl}/${user.id}`).subscribe(
      () => this.getAll()
    );
  }

}
