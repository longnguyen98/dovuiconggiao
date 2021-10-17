import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Question, ReportData} from '../../models/model';
import * as $ from "jquery";
import {QuestionsService} from "../../services/questions.service";
import {UserComponent} from './user/user.component';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {ReportService} from "../../services/report.service";
import {QuestionStore} from "../../repository/question.store";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'content', 'topics', 'author', 'date', 'actions', 'statusColor'];
  ELEMENT_DATA: Question[] = [];
  dataSource = new MatTableDataSource<Question>(this.ELEMENT_DATA);
  totalQuestion = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('userComponent', {static: true}) userComponent: UserComponent;
  //
  statusColor = ['bg-info', 'bg-success', 'bg-danger'];
  status = ['Chờ duyệt', 'Đã duyệt', 'Đã ẩn'];
  //
  reportData: ReportData[] = [];

  constructor(private questionsService: QuestionsService, private router: Router, private reportService: ReportService,
              private localStore: QuestionStore,) {

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
      this.ELEMENT_DATA = this.ELEMENT_DATA.sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());
      this.dataSource.data = this.ELEMENT_DATA;
      this.totalQuestion = this.dataSource.data.length;
    });
    this.reportService.getQuestionsReport((data: ReportData) => {
      this.reportData.push(data);
    });
  }

  onDelete(id: string): void {
    Swal.fire({
      title: 'Xác nhận xóa',
      html: 'Dữ liệu sẽ mất và không thể phục hồi',
      icon: 'question',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
      showCancelButton: true
    }).then(value => {
      if (value.isConfirmed) {
        this.questionsService.delete(id).then(() => {
          this.dataSource.data = this.ELEMENT_DATA.filter((q) => q.id !== id);
        });
      }
    });
  }

  filterByStatus(status: number) {
    if (status >= 0) {
      this.questionsService.query([{field: 'status', op: '==', value: status}], (docs: Question[]) => {
        this.dataSource.data = docs.sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());
      }, () => {
        this.dataSource.data = [];
      });
    } else {
      this.dataSource.data = this.ELEMENT_DATA;
    }
  }

  approvalQuestion(status: string, question: Question): void {
    if (!status) {
      Swal.fire('Something false', '', 'error').then(r => {
      });

    } else {
      if (!question) {
        Swal.fire('Something false', '', 'error').then(r => {
          //do nothing :))
        });
      } else {
        if (status == 'approved') {
          question.status = 1;
        } else {
          question.status = 2;
        }
        this.questionsService.update(question.id, question, () => {
          this.localStore.upsert(question.id!, question);
        }, (err: any) => {
          Swal.fire('Úi! có lỗi rồi! Chụp ảnh màn hình rồi gửi mấy bạn Dev nha', err, 'error').then(r => {
            console.log(err);
          });
        });
      }
    }
  }

}



