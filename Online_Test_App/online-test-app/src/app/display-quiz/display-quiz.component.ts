import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
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

  constructor(public service: QuizService, public router: Router) {
    this.name = sessionStorage.getItem("quiz") as string;
    this.service.loadQuizQuestions(this.name.toLowerCase()).subscribe(result => this.questions = result);
  }

  ngOnInit(): void { }

  checkAnswers() {
    // console.log(this.quizRef.value);
    let keys = Object.keys(this.quizRef.controls);
    // Object.keys(this.quizRef.controls).forEach(key => sessionStorage.setItem(key, this.quizRef.get(key)!.value));
    for (let i = 1; i <= keys.length; i++) {
      this.questions[i-1].response = this.quizRef.get("q"+i)!.value;
    }
    // Object.keys(this.quizRef.controls).forEach(key => sessionStorage.setItem(key, this.quizRef.get(key)!.value));
    // console.log(this.questions)
    sessionStorage.setItem("questions", JSON.stringify(this.questions));
    // let answers = JSON.stringify(this.quizRef.value);
    // sessionStorage.setItem("answers", answers);
    this.router.navigate(["results"]);
  }
}
