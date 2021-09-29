import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Question, User} from '../../models/model';
import * as $ from "jquery";
import {QuestionsService} from "../../services/questions.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SecurityUtil} from "../../utils/security.util";
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'content', 'topics', 'actions'];
  ELEMENT_DATA: Question[] = [];
  dataSource = new MatTableDataSource<Question>(this.ELEMENT_DATA);
  isEdit: boolean = false;
  userId: string | null | undefined;
  user: User;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private questionsService: QuestionsService
    , private activatedRoute: ActivatedRoute
    , private router: Router
    , private security: SecurityUtil) {
    this.userId = activatedRoute.snapshot.paramMap.get('id');
    if (this.userId) {

    } else {
      security.getCurrentUser((user: User) => {
        this.user = user;
      }, () => {
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.questionsService.list().then((qs) => {
      qs.forEach((doc) => {
        this.ELEMENT_DATA.push(<Question>doc.data());
      });
      console.log(this.ELEMENT_DATA);
      this.ELEMENT_DATA.sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());
      this.dataSource.data = this.ELEMENT_DATA;
    });

  }

  onEditProfile(): void {
    if (this.isEdit) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }
}
