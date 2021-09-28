import {COLLECTIONS, Topic} from "../models/model";
import {Injectable} from "@angular/core";
import {CRUDFirestoreService} from "./crud.service";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})
export class TopicsService extends CRUDFirestoreService<Topic> {
  constructor(private store: AngularFirestore) {
    super(store, COLLECTIONS.TOPICS);
  }
}

