import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Question } from '../question.model';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.css']
})
export class DisplayQuizComponent implements OnInit {
  name: string = "";
  questions: Array<Question> = [];
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

  constructor(public service: QuizService, public router:Router) {
    this.name = sessionStorage.getItem("quiz") as string;
    this.service.loadQuizQuestions(this.name.toLowerCase()).subscribe(result => this.questions = result);
  }

  ngOnInit(): void { }

  checkAnswers() {
    console.log(this.quizRef.value);
    let answers = JSON.stringify(this.quizRef.value);
    sessionStorage.setItem("answers", answers);
    this.router.navigate(["results"]);
  }
}
