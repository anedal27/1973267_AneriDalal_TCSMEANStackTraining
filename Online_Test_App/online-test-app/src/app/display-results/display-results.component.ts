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

  constructor(public service: QuizService) {
    this.name = sessionStorage.getItem("quiz") as string;
    this.service.loadQuizQuestions(this.name.toLowerCase()).subscribe(result => this.questions = result);
  }

  ngOnInit(): void {
    let ans = JSON.parse(sessionStorage.getItem("answers")!);
    console.log(ans);
    for (let i = 1; i <= Object.keys(ans).length; i++) {
      let key = "q" + i;
      this.answers.push(ans[key]);
    }
    console.log(this.answers);
  }
}
