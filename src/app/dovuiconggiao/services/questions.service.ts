import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Question} from "../models/model";
import {v4 as uuid} from "uuid";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root',
})
export class QuestionsService {

  questionsCollection: any;

  constructor(private firestore: AngularFirestore) {
    this.questionsCollection = this.firestore.collection<Question>('questions');
  }

  addQuestions(question: Question): Question {
    question.id = uuid();
    this.questionsCollection.add(question);
    return question;
  }
}
