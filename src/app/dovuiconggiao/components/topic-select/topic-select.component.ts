import {Component, Input, OnInit} from '@angular/core';
import {Topic} from "../../models/model";
import {FormControl} from "@angular/forms";
import {TopicsService} from "../../services/topics.service";
import {QuerySnapshot} from "@angular/fire/firestore";


@Component({
  selector: 'topic-select',
  templateUrl: './topic-select.component.html',
  styleUrls: ['./topic-select.component.css']
})
export class TopicSelectComponent implements OnInit {

  topics: Topic[] = [];
  topicsFormControl = new FormControl();
  loading = true;
  @Input()
  multiple = false;

  constructor(private topicService: TopicsService) {
    topicService.listThenStore().then((qs: QuerySnapshot<Topic>) => {
      if (!qs.empty) {
        let topics: Topic[] = [];
        qs.forEach(function (doc) {
          topics.push(<Topic>doc.data());
        });
        this.topics = topics.sort(function (a, b) {
          return a.order - b.order;
        });
        this.loading = false;
      }
    });
  }

  getSelectedTopics(): Topic[] {
    if (!this.topicsFormControl.value) {
      return [];
    }
    return this.topics.filter((t) => {
      let ids: string[] = [this.topicsFormControl.value];
      return ids.includes(t.id);
    });
  }

  getSelectedTopicIds(): string[] {
    if (this.topicsFormControl.value) {
      return [this.topicsFormControl.value];
    } else {
      return [];
    }
  }

  ngOnInit(): void {

  }

}
