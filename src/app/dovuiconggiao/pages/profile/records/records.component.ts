import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import * as $ from "jquery";
import {RecordService} from 'src/app/dovuiconggiao/services/record.service';
import {Record} from 'src/app/dovuiconggiao/models/model';
import Swal from "sweetalert2";
import {TopicsService} from 'src/app/dovuiconggiao/services/topics.service';
import {Topic} from 'src/app/dovuiconggiao/models/model';
import {Utils} from "src/app/dovuiconggiao/utils/utils";
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
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private recordService: RecordService,
              private util: Utils,
              private topicsService: TopicsService) {
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
    this.recordService.list().then((qs) => {
      qs.forEach((doc) => {
        this.ELEMENT_DATA.push(<Record>doc.data());
      });
      this.dataSource.data = this.ELEMENT_DATA;
      this.totalRecords = this.dataSource.data.length;
    });
    this.topicsService.list().then((qs) => {
      qs.forEach((doc) => {
        this.topicsName.push(<Topic>doc.data());
      });
    });
  }

}