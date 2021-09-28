import {BaseModel} from "../models/model";
import {AngularFirestore, AngularFirestoreCollection, QuerySnapshot} from "@angular/fire/firestore";


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

  //Delete
  delete(id: string): Promise<void> {
    return this.collection.doc<Model>().delete();
  }
}
