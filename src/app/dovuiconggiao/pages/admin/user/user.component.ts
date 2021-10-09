import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import * as $ from "jquery";
import {UsersService} from 'src/app/dovuiconggiao/services/users.service';
import {User} from 'src/app/dovuiconggiao/models/model';
import {FormControl} from "@angular/forms";
import Swal from "sweetalert2";
import {ROLE_LIST, ROLES} from "../../../constants/constants";
import {Utils} from "src/app/dovuiconggiao/utils/utils";

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
  allRoles = ROLE_LIST;
  isChangeRole = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private userService: UsersService,
              private util: Utils,) {
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
    });
  }

  saveRole(userId: string, userRoles: string[]) {    
    if(this.isChangeRole){
      this.util.showLoading();
      if(!userId || !userRoles) {
        this.util.hideLoading();
        Swal.fire('Something false', '', 'error').then(r => {
          //do nothing :))
        });
      } 
      else {
        let userToChange = this.dataSource.data.find(e => e.id == userId);
        if(userToChange){
          this.userService.update(userToChange.id, userToChange, () => {
            Swal.fire('OK gòi đó!', '', 'success').then(r => {
            });
          }, (err: any) => {
            Swal.fire('Úi! có lỗi rồi! Chụp ảnh màn hình rồi gửi mấy bạn Dev nha', err, 'error').then(r => {
              console.log(err);
            });
          });
        }
        this.util.hideLoading();
      }
      this.isChangeRole = false;
    }
  }
}





