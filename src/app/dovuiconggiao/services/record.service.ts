import {COLLECTIONS, Record} from "../models/model";
import {Injectable} from "@angular/core";
import {CRUDFirestoreService} from "./crud.service";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})
export class RecordService extends CRUDFirestoreService<Record> {

  constructor(private f: AngularFirestore) {
    super(f, COLLECTIONS.RECORDS);
  }
}

