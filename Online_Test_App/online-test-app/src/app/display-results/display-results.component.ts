import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-display-results',
  templateUrl: './display-results.component.html',
  styleUrls: ['./display-results.component.css']
})
export class DisplayResultsComponent implements OnInit {
  name: string = "";
  questions: Array<Question> = [];
  score: number = 0;
  grade: string = "Fail";

  constructor() { }

  ngOnInit(): void {
    this.name = sessionStorage.getItem("quiz") as string;
    this.questions = JSON.parse(sessionStorage.getItem("questions")!);
    this.displayScore();
  }

  displayScore() {
    for (let q of this.questions) {
      if (q.answer == q.response) {
        this.score++;
      }
    }
    if (this.score / this.questions.length >= 0.70) {
      this.grade = "Pass"
    }
  }
}
