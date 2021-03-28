import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  quiz: string = "";

  constructor(public router: Router) { }
  ngOnInit(): void { }

  loadQuiz(quizRef: any) {
    this.quiz = quizRef.quiz;
    console.log(this.quiz)
    if (this.quiz != "") {
      sessionStorage.setItem("quiz", this.quiz);
      this.router.navigate(["quiz"]);
    }
  }

  selected(quizRef: any) {

  }
}
