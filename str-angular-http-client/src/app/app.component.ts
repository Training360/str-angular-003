import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'str-angular-http-client';
  phrase: string = '';
  filterKey: string = 'first_name';
  filterKeys: string[] = Object.keys(new User());

  // Paginator.
  productsProperties: {count: number} = {
    count: 0,
  };
  pageSize: number = 10;
  pageStart: number = 1;
  currentPage: number = 1;
  get paginator(): IPageBtn[] {
    const pages: IPageBtn[] = [];
    for (let i = 0; i < this.productsProperties.count / this.pageSize && pages.length < 10; i++) {
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

  userList$: Observable<User[]> = this.userService.list$.pipe(
    map( (users: User[]) => users.filter( user => user.catID === 1 ) ),
    tap( users => this.productsProperties.count = users.length )
  );
  // userList: User[] = this.userService.list;
  cols: ITableCol[] = this.config.tableCols;

  constructor(
    private userService: UserService,
    private config: ConfigService,
  ) {}

  ngOnInit(): void {
    this.userService.getAll();
  }

  onUpdate(user: User): void {
    this.userService.update(user);
  }

  onDelete(user: User): void {
    this.userService.remove(user);
  }

  onPaginate(ev: Event, btn: IPageBtn): void {
    ev.preventDefault();
    this.currentPage = btn.page;
    this.pageStart = (btn.page - 5) < 1 ? 1 : (btn.page - 5);
  }

  onStepPage(ev: Event, step: number): void {
    ev.preventDefault();
    this.currentPage += step;
    this.pageStart = (this.currentPage - 5) < 1 ? 1 : (this.currentPage - 5);
  }
}
