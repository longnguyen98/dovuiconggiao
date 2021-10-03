import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Question, User} from '../../models/model';
import * as $ from "jquery";
import {QuestionsService} from "../../services/questions.service";
import {UserComponent} from './user/user.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'content', 'topics', 'author', 'location', 'actions'];
  ELEMENT_DATA: Question[] = [];
  dataSource = new MatTableDataSource<Question>(this.ELEMENT_DATA);
  totalUser = UserComponent.prototype.totalUser;
  totalQuestion = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private questionsService: QuestionsService) {
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
}



