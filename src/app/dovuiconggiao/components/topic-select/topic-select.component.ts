import {Component, OnInit} from '@angular/core';
import {Topic} from "../../models/model";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'topic-select',
  templateUrl: './topic-select.component.html',
  styleUrls: ['./topic-select.component.css']
})
export class TopicSelectComponent implements OnInit {

  topics: Topic[] = [];
  topicsFormControl = new FormControl();

  constructor() {
    this.topics.push({id: '1', name: 'Cựu Ước', description: ''});
    this.topics.push({id: '2', name: 'Tân Ước', description: ''});
    this.topics.push({id: '3', name: 'Giáo Lý', description: ''});
    this.topics.push({id: '4', name: 'Phụng vụ', description: ''});
    this.topics.push({id: '5', name: 'Thánh ca', description: ''});
  }

  ngOnInit(): void {
    this.topicsFormControl.setValue(['1', '3']);
  }

}
