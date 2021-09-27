import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Question} from "../models/model";
import {Observable} from "rxjs";
import firebase from "firebase/compat";
import QuerySnapshot = firebase.firestore.QuerySnapshot;


export class CRUDFirestoreService<Model> {
  private readonly collection: AngularFirestoreCollection;
  private readonly firestore: AngularFirestore;

  constructor(private fs: AngularFirestore, collectionPath: string) {
    this.firestore = fs;
    this.collection = this.firestore.collection<Model>(collectionPath);
  }

  createOrUpdate(model: Model): Promise<any> {
    return this.collection.add(model);
  }

  //Read
  get(id: string): Promise<any> {
    return this.collection.doc<Model>(id).get().toPromise();
  }

  list(): Promise<QuerySnapshot> {
    return this.collection.get().toPromise();
  }

  //Delete
  delete(id: string): Promise<void> {
    return this.collection.doc<Model>().delete();
  }
}
