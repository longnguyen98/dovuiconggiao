import {EntityState, EntityStore, QueryEntity, StoreConfig} from '@datorama/akita';
import {COLLECTIONS, Question} from "../models/model";
import {Injectable} from "@angular/core";

export interface QuestionState extends EntityState<Question, string> {

}

@StoreConfig({name: COLLECTIONS.QUESTIONS})
@Injectable({providedIn: "root"})
export class QuestionStore extends EntityStore<QuestionState> {
  constructor() {
    super();
  }
}

@Injectable({providedIn: "root"})
export class QuestionQuery extends QueryEntity<QuestionState> {
  constructor(protected store: QuestionStore) {
    super(store);
  }
}
