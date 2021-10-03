import {COLLECTIONS, Question} from "../models/model";
import {Injectable} from "@angular/core";
import {CRUDFirestoreService} from "./crud.service";
import {AngularFirestore, AngularFirestoreCollection, DocumentData, QuerySnapshot} from "@angular/fire/firestore";
import {QuestionStore} from "../repository/question.store";

@Injectable({
  providedIn: 'root',
})
export class QuestionsService extends CRUDFirestoreService<Question> {
  private readonly questionCollection: AngularFirestoreCollection;

  constructor(private f: AngularFirestore, private localStore: QuestionStore) {
    super(f, COLLECTIONS.QUESTIONS);
    this.questionCollection = f.collection<Question>(COLLECTIONS.QUESTIONS);
  }

  listQuestionThenStore(): Promise<QuerySnapshot<any>> {
    return this.questionCollection.get().pipe((data) => {
      data.toPromise().then((docs) => {
        let a: Question[] = [];
        docs.forEach((doc) => {
          a.push(<Question>doc.data());
        });
        this.localStore.add(a);
      })
      return data;
    }).toPromise();
  }


}

