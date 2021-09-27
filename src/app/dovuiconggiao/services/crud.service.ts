import {AngularFirestore, AngularFirestoreCollection, DocumentSnapshot} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import QuerySnapshot = firebase.firestore.QuerySnapshot;


export class CRUDFirestoreService<Model> {
  private readonly collection: AngularFirestoreCollection;
  private readonly firestore: AngularFirestore;

  constructor(private fs: AngularFirestore, private collectionPath: string) {
    this.firestore = fs;
    this.collection = this.firestore.collection<Model>(collectionPath);
  }

  create(model: Model): Promise<any> {
    return this.collection.add(model);
  }

  //Read
  get(id: string, onSuccess: any, onError: any): void {
    this.collection.ref.where('id', '==', id).get().then((qs) => {
      qs.docs[0].ref.get().then((ds)=>onSuccess(ds)).catch(err => onError(err));
    });
  }

  update(id: string, model: Model, onSuccess: any, onError: any): void {
    this.collection.ref.where('id', '==', id).get().then(qs => {
      qs.docs[0].ref.set(model).then(onSuccess).catch(err => onError(err));
    });
  }

  list(): Promise<QuerySnapshot> {
    return this.collection.get().toPromise();
  }

  //Delete
  delete(id: string): Promise<void> {
    return this.collection.doc<Model>().delete();
  }
}
