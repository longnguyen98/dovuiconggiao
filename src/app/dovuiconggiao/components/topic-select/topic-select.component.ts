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
  @Input()
  play = false;
  ignoreList: string[] = ['BceWltO5DzIvoTLm9b9Y', 'Q4ox5VWKayHxDwaJX8L1', 'oqXrX5eJH8PXl24pKdgA'];

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
        if (this.play) {
          this.topics = this.topics.filter((tp) => !this.ignoreList.includes(tp.id));
        }
        this.loading = false;
      }
    });
  }

  getSelectedTopics(): Topic[] {
    if (!this.topicsFormControl.value) {
      return [];
    }
    return this.topics.filter((t) => {
      let ids: string[] = this.multiple ? this.topicsFormControl.value : [this.topicsFormControl.value];
      return ids.includes(t.id);
    });
  }

  getSelectedTopicIds(): string[] {
    if (this.topicsFormControl.value) {
      return this.multiple ? this.topicsFormControl.value : [this.topicsFormControl.value];
    } else {
      return [];
    }
  }

  ngOnInit(): void {

  }

}
