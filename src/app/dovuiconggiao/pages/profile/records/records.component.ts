import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import * as $ from "jquery";
import {RecordService} from 'src/app/dovuiconggiao/services/record.service';
import Swal from "sweetalert2";
import {TopicsService} from 'src/app/dovuiconggiao/services/topics.service';
import {Topic, Record, User} from 'src/app/dovuiconggiao/models/model';
import {Utils} from "src/app/dovuiconggiao/utils/utils";
import {SecurityUtil} from "src/app/dovuiconggiao/utils/security.util";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'score', 'time', 'rightAnswer', 'topics'];
  ELEMENT_DATA: Record[] = [];
  dataSource = new MatTableDataSource<Record>(this.ELEMENT_DATA);
  totalRecords = 0;
  topicsName: Topic[] = [];
  userId: string | null | undefined;
  user: User;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private recordService: RecordService,
              private util: Utils,
              private topicsService: TopicsService,
              private activatedRoute: ActivatedRoute,
              private security: SecurityUtil) {
  this.userId = activatedRoute.snapshot.paramMap.get('id');

  }


  ngAfterViewInit() {
    $('.nav-link.active').removeClass('active');
    $('.nav-link[page=admin]').addClass('active');
    this.dataSource.paginator = this.paginator;
  }

  getTopicName(topicId : string): string {
    let topicName = this.topicsName.find(e => e.id == topicId);
    if(topicName) {
      return topicName.name;
    }
    return '';

  }

  ngOnInit(): void {
    if (this.userId) {
    } else {
      this.security.getCurrentUser((user: User) => {
        this.user = user;
        this.recordService.query([{
          field: 'userId',
          op: '==',
          value: this.user.id
        }], (docs: Record[]) => {
          console.log(docs);
          this.dataSource.data = docs;
          this.totalRecords = this.dataSource.data.length;
        });
      }, () => {
      });
    }
    this.topicsService.list().then((qs) => {
      qs.forEach((doc) => {
        this.topicsName.push(<Topic>doc.data());
      });
    });
  }

}