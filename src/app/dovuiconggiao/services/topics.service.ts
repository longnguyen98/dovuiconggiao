import {COLLECTIONS, Question, Topic} from "../models/model";
import {Injectable} from "@angular/core";
import {CRUDFirestoreService} from "./crud.service";
import {AngularFirestore, AngularFirestoreCollection, QuerySnapshot} from "@angular/fire/firestore";
import {TopicQuery, TopicStore} from "../repository/topic.store";

@Injectable({
  providedIn: 'root',
})
export class TopicsService extends CRUDFirestoreService<Topic> {
  private readonly topicCollection: AngularFirestoreCollection;

  constructor(private store: AngularFirestore, private localStore: TopicStore, private localQuery: TopicQuery) {
    super(store, COLLECTIONS.TOPICS);
    this.topicCollection = store.collection<Topic>(COLLECTIONS.TOPICS);
    //
    // this.topicCollection.valueChanges().subscribe((change) => {
    //   this.localStore.set(<Topic[]>change);
    // });
  }

  listThenStore(): Promise<QuerySnapshot<any>> {
    return this.topicCollection.get().pipe((data) => {
      data.toPromise().then((docs) => {
        let a: Topic[] = [];
        docs.forEach((doc) => {
          a.push(<Topic>doc.data());
        });
        this.localStore.add(a);
      })
      return data;
    }).toPromise();
  }
}

