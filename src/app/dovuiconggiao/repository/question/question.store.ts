import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {COLLECTIONS, Question} from "../../models/model";

export interface QuestionState extends EntityState<Question, string> {
  filter: string;
}

@StoreConfig({name: COLLECTIONS.QUESTIONS})
export class QuestionStore extends EntityStore<QuestionState> {
  constructor() {
    super({filter: 'ALL'});
  }
}
