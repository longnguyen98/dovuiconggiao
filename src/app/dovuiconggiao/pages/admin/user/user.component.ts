import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import * as $ from "jquery";
import { UsersService } from 'src/app/dovuiconggiao/services/users.service';
import { User } from 'src/app/dovuiconggiao/models/model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name0', 'email', 'location', 'name3'];
  ELEMENT_DATA: User[] = [];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private userService: UsersService) {
  }

  ngAfterViewInit() {
    $('.nav-link.active').removeClass('active');
    $('.nav-link[page=admin]').addClass('active');
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.userService.list().then((qs) => {
      qs.forEach((doc) => {
        this.ELEMENT_DATA.push(<User>doc.data());
      });
      console.log("Users:"+this.ELEMENT_DATA);
      this.dataSource.data = this.ELEMENT_DATA;
    });

  }
}



