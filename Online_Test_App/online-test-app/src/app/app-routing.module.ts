import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayQuizComponent } from './display-quiz/display-quiz.component';
import { DisplayResultsComponent } from './display-results/display-results.component';
import { HomeComponent } from './home/home.component';
import { QuizAuthGuard } from './quizauthguard';
import { ResultsAuthGuard } from './resultsauthguard';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "quiz", component: DisplayQuizComponent, canActivate: [QuizAuthGuard] },
  { path: "results", component: DisplayResultsComponent, canActivate: [ResultsAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
