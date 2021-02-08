import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { unzipSync } from 'zlib';
import { User } from './model/user';
import { ConfigService } from './service/config.service';
import { ITableCol } from './service/config.service';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'str-angular-http-client';
  phrase: string = '';
  filterKey: string = 'first_name';
  filterKeys: string[] = Object.keys(new User());

  userList$: Observable<User[]> = this.userService.getAll().pipe(
    map( users => users.filter( user => user.catID === 1 ) )
  );
  // userList: User[] = this.userService.list;
  cols: ITableCol[] = this.config.tableCols;

  constructor(
    private userService: UserService,
    private config: ConfigService,
  ) {}

  onUpdate(user: User): void {
    this.userService.update(user).subscribe(
      updatedUser => console.log(updatedUser)
    );
  }

  onDelete(user: User): void {
    this.userService.remove(user).subscribe(
      () => console.log('deleted')
    );
  }
}
