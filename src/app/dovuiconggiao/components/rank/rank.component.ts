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
import {UsersService} from 'src/app/dovuiconggiao/services/users.service';
import {DocumentSnapshot} from '@angular/fire/firestore';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'score', 'userName', 'location', 'rightAnswer', 'topics'];
  ELEMENT_DATA: Record[] = [];
  dataSource = new MatTableDataSource<Record>(this.ELEMENT_DATA);
  totalRecords = 0;
  topicsName: Topic[] = [];
  selectedTopic = '';


  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private recordService: RecordService,
              private util: Utils,
              private topicsService: TopicsService,
              private activatedRoute: ActivatedRoute,
              private security: SecurityUtil,
              private userService: UsersService) {
  }


  ngAfterViewInit() {
    $('.nav-link.active').removeClass('active');
    $('.nav-link[page=admin]').addClass('active');
    this.dataSource.paginator = this.paginator;
  }

  getTopicName(topicId: string): string {
    let topicName = this.topicsName.find(e => e.id == topicId);
    if (topicName) {
      return topicName.name;
    }
    return '';
  }

  getUserName(userId: string) {
    this.userService.get(userId, (ds: DocumentSnapshot<User>) => {
      if (ds.exists) {
        console.log(ds.data);
      }
    }, (err: any) => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.recordService.list().then((qs) => {
      qs.forEach((doc) => {
        let record = <Record>doc.data();
        this.ELEMENT_DATA.push(record);
      });
      this.dataSource.data = this.ELEMENT_DATA.sort((a, b) => b.score - a.score);
      this.dataSource.data.forEach((el) => {
        this.userService.get(el.userId, (ds: DocumentSnapshot<User>) => {
          el.user = ds.data();
        }, () => {
        });
      });
    });


    this.topicsService.list().then((qs) => {
      qs.forEach((doc) => {
        this.topicsName.push(<Topic>doc.data());
      });
    });
  }

}
