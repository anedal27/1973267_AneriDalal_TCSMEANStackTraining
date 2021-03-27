import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DisplayQuizComponent } from './display-quiz/display-quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayResultsComponent } from './display-results/display-results.component';
import { MyAuthGuard } from './myauthguard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DisplayQuizComponent,
    DisplayResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MyAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
