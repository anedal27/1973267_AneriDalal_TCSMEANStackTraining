import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(public http: HttpClient) { }

  loadQuizQuestions(quizName:string) {
    return this.http.get<Question[]>(`/assets/${quizName}-quiz.json`);
  }
}
