import {EntityState, EntityStore, QueryEntity, StoreConfig} from '@datorama/akita';
import {COLLECTIONS, Topic} from "../models/model";
import {Injectable} from "@angular/core";

export interface TopicState extends EntityState<Topic, string> {

}

@StoreConfig({name: COLLECTIONS.TOPICS})
@Injectable({providedIn: "root"})
export class TopicStore extends EntityStore<TopicState> {
  constructor() {
    super();
  }
}

@Injectable({providedIn: "root"})
export class TopicQuery extends QueryEntity<TopicState> {
  constructor(protected store: TopicStore) {
    super(store);
  }
}
