import {BaseModel} from "../models/model";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData,
  Query,
  QuerySnapshot
} from "@angular/fire/firestore";
import {Observable} from "rxjs";


export class CRUDFirestoreService<Model> {
  private readonly collection: AngularFirestoreCollection;
  private readonly firestore: AngularFirestore;

  constructor(private fs: AngularFirestore, private collectionPath: string) {
    this.firestore = fs;
    this.collection = this.firestore.collection<Model>(collectionPath);
  }

  create(model: BaseModel, onSuccess: any, onError: any): Promise<any> {
    return this.collection.add(model).then((dr) => {
      model.id = dr.id;
      this.update(dr.id, model, onSuccess, onError);
    });
  }

  //Read
  get(id: string, onSuccess: any, onError: any): void {
    this.collection.doc(id).get().toPromise().then((qs) => onSuccess(qs)).catch((err) => onError(err));
  }

  update(id: string, model: BaseModel, onSuccess: any, onError: any): void {
    this.collection.doc(id).set(model).then(() => onSuccess()).catch((err) => onError(err));
  }

  list(): Promise<QuerySnapshot<any>> {
    return this.collection.get().toPromise();
  }

  query(queries: any[], onSucces: any, limit?: number): void {
    let ref = this.collection.ref;
    let query: Query = ref.where(queries[0].field, queries[0].op, queries[0].value);
    for (let i = 1; i < queries.length; i++) {
      let q = queries[i];
      query = query.where(q.field, q.op, q.value);
      if (q.limit) {
        query = query.limit(q.limit);
      }
    }
    query.get().then((qs) => {
      if (!qs.empty) {
        let docs: any[] = [];
        qs.forEach((doc) => {
          docs.push(doc.data());
        });
        onSucces(docs);
      } else {
        console.log('NO_RECORDS');
      }
    }).catch((err) => {
      console.log('FIRESTORE ERROR', err);
    });
  }

  valueChanges(id: string, field: string): Observable<DocumentData | undefined> {
    return this.collection.doc(id).valueChanges({idField: field});
  }

  //Delete
  delete(id: string): Promise<void> {
    return this.collection.doc<Model>().delete();
  }
}
