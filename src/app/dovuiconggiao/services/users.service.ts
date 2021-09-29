import {COLLECTIONS, User} from "../models/model";
import {Injectable} from "@angular/core";
import {CRUDFirestoreService} from "./crud.service";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})
export class UsersService extends CRUDFirestoreService<User> {
  constructor(private store: AngularFirestore) {
    super(store, COLLECTIONS.USERS);
  }
}

