import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Question, User} from '../../models/model';
import * as $ from "jquery";
import {QuestionsService} from "../../services/questions.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SecurityUtil} from "../../utils/security.util";
import Swal from "sweetalert2";
import {UsersService} from '../../services/users.service';
import {DocumentSnapshot} from "@angular/fire/firestore";
import {QUESTION_STATUS} from "../../constants/constants";
// import * as internal from 'stream';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'content', 'topics', 'status', 'actions'];
  ELEMENT_DATA: Question[] = [];
  dataSource = new MatTableDataSource<Question>(this.ELEMENT_DATA);
  isEdit = false;
  userId: string | null | undefined;
  user: User;
  status = QUESTION_STATUS;
  totalQuestion = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private questionsService: QuestionsService
    , private activatedRoute: ActivatedRoute
    , private router: Router
    , private security: SecurityUtil
    , private userService: UsersService) {

    this.userId = activatedRoute.snapshot.paramMap.get('id');

  }

  ngAfterViewInit() {
    $('.nav-link.active').removeClass('active');
    $('.nav-link[page=profile]').addClass('active');
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    if (this.userId) {

    } else {
      this.security.getCurrentUser((user: User) => {
        this.user = user;
        this.questionsService.query([{
          field: 'authorId',
          op: '==',
          value: this.user.id
        }], (docs: Question[]) => {
          console.log(docs);
          this.dataSource.data = docs.sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());
          this.totalQuestion = this.dataSource.data.length;
        });
      }, () => {
      });
    }
  }

  onEditProfile(): void {
    if (this.isEdit) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  onSaveProfile(): void {
    this.showLoading();
    console.log(this.user);
    this.userService.update(this.user.id, this.user, () => {
      Swal.close();
      Swal.fire('OK gòi đó!', '', 'success').then(r => {
        this.isEdit = false;
      });
    }, (err: any) => {
      Swal.fire('Úi! có lỗi rồi! Chụp ảnh màn hình rồi gửi mấy bạn Dev nha', err, 'error').then(r => {
        console.log(err);
      });
    });
  }

  showLoading(): void {
    Swal.fire({
      title: 'Chờ xíu nha!',
      html: '<img src="/assets/loading.gif" alt="loading" style="width: 100px;height: auto"/>',
      showCancelButton: false,
      showConfirmButton: false
    });
  }
}
