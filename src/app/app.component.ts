import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { EnrolleesService, User } from './services/enrollees.service';
import { EditComponent } from './components/edit/edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', 'dateOfBirth', 'active', 'action'];
  dataSource: MatTableDataSource<User>;

  constructor(
    public enrolleeService: EnrolleesService,
    public _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.enrolleeService.getAll()
      .then((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.initPagination();
      })
      .catch(error => this.openSnackBar(error.statusText, null));
  }

  initPagination() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openSnackBar(message: any, action: string) {
    this._snackBar.open(message, action || 'Ok', {
      duration: 2000,
    });
  }

  openDialog(user: User) {
    const dialogRef = this.dialog.open(EditComponent, {
      height: 'auto',
      width: '500px',
      data: {
        user: { ...user }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.enrolleeService.put(result)
        .then(() => {
          this.getUsers();
        })
        .catch(error => this.openSnackBar(error.statusText, null));
      }
    });
  }
}
