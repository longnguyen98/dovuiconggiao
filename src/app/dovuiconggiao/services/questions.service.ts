import {AngularFirestore} from "@angular/fire/compat/firestore";
import {COLLECTIONS, Question} from "../models/model";
import {Injectable} from "@angular/core";
import {CRUDFirestoreService} from "./crud.service";

@Injectable({
  providedIn: 'root',
})
export class QuestionsService extends CRUDFirestoreService<Question> {
  constructor(private store: AngularFirestore) {
    super(store, COLLECTIONS.QUESTIONS);
  }
}

