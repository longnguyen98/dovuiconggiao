import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Option, Question} from '../../models/model';
import * as $ from "jquery";
import {QuestionsService} from "../../services/questions.service";
import {UserComponent} from './user/user.component';
import * as XLXS from 'xlsx';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {CONSTANTS} from "../../constants/constants";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'content', 'topics', 'author', 'location', 'actions', 'statusColor'];
  ELEMENT_DATA: Question[] = [];
  dataSource = new MatTableDataSource<Question>(this.ELEMENT_DATA);
  totalQuestion = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('userComponent', {static: true}) userComponent: UserComponent;
  //
  statusColor = ['bg-info', 'bg-success', 'bg-danger'];
  status = ['Chờ duyệt', 'Đã duyệt', 'Đã ẩn'];

  constructor(private questionsService: QuestionsService, private router: Router) {

  }

  ngAfterViewInit() {
    $('.nav-link.active').removeClass('active');
    $('.nav-link[page=admin]').addClass('active');
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.questionsService.listQuestionThenStore().then((qs) => {
      qs.forEach((doc) => {
        this.ELEMENT_DATA.push(<Question>doc.data());
      });
      this.dataSource.data = this.ELEMENT_DATA.sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());
      this.totalQuestion = this.dataSource.data.length;
    });
  }

  onDelete(id: string): void {
    Swal.fire({
      title: 'Xóa hen?',
      html: 'xóa là mất luôn đó nha!',
      icon: 'question',
      confirmButtonText: 'Okey',
      cancelButtonText: 'Chotto matte',
      showCancelButton: true
    }).then(value => {
      if (value.isConfirmed) {
        this.questionsService.delete(id).then(() => {
          this.dataSource.data = this.ELEMENT_DATA.filter((q) => q.id !== id);
        });
      }
    });
  }

}



