import {AngularFirestore} from "@angular/fire/compat/firestore";
import {COLLECTIONS, Question, Topic} from "../models/model";
import {Injectable} from "@angular/core";
import {CRUDFirestoreService} from "./crud.service";

@Injectable({
  providedIn: 'root',
})
export class TopicsService extends CRUDFirestoreService<Topic> {
  constructor(private store: AngularFirestore) {
    super(store, COLLECTIONS.TOPICS);
  }
}

