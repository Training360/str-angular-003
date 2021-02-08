import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from './model/user';
import { ConfigService } from './service/config.service';
import { ITableCol } from './service/config.service';
import { UserService } from './service/user.service';

interface IPageBtn {
  page: number;
}

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

  // Paginator.
  productsNum: number = 0;
  pageSize: number = 10;
  pageStart: number = 1;
  currentPage: number = 1;
  get paginator(): IPageBtn[] {
    const pages = [];
    for (let i = 0; i < this.productsNum / this.pageSize && pages.length < 10; i++) {
      const page = this.pageStart + i;
      pages.push({page});
    }
    return pages;
  }
  get pageSliceStart(): number {
    const index = this.currentPage - 1;
    return index === 0 ? 0 : (index * this.pageSize);
  }
  get pageSliceEnd(): number {
    return this.pageSliceStart + this.pageSize;
  }

  userList$: Observable<User[]> = this.userService.getAll().pipe(
    map( (users: User[]) => users.filter( user => user.catID === 1 ) ),
    tap( users => this.productsNum = users.length )
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

  onPaginate(ev: Event, btn: IPageBtn): void {
    ev.preventDefault();
    this.currentPage = btn.page;
    this.pageStart = (btn.page - 5) < 1 ? 1 : (btn.page - 5);
    console.log(btn);
  }
}
