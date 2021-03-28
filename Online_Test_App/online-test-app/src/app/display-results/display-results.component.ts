import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  answers: Array<string> = [];
  quizRef = new FormGroup({
    q1: new FormControl(),
    q2: new FormControl(),
    q3: new FormControl(),
    q4: new FormControl(),
    q5: new FormControl(),
    q6: new FormControl(),
    q7: new FormControl(),
    q8: new FormControl(),
    q9: new FormControl(),
    q10: new FormControl()
  })
  score: number = 0;
  grade:string = "fail";

  constructor(public service: QuizService) {
    this.name = sessionStorage.getItem("quiz") as string;
    // this.service.loadQuizQuestions(this.name.toLowerCase()).subscribe(result => this.questions = result);
  }

  ngOnInit(): void {
    // for(let i = 1; i <= sessionStorage.length; i++) {
    //   this.answers.push(sessionStorage.getItem("q"+i)!);
    // }
    // console.log(this.answers);
    this.questions = JSON.parse(sessionStorage.getItem("questions")!);
    console.log(this.questions);
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
