import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import * as $ from "jquery";
import { UsersService } from 'src/app/dovuiconggiao/services/users.service';
import { User } from 'src/app/dovuiconggiao/models/model';
import {FormControl} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name0', 'email', 'location', 'name3', 'roles'];
  ELEMENT_DATA: User[] = [];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  rolesFormControl = new FormControl();
  roles: string[] = [];
  totalUser = 0;

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
      this.dataSource.data = this.ELEMENT_DATA;
      this.totalUser = this.dataSource.data.length;
      console.log(this.totalUser);
    });
  }
}




