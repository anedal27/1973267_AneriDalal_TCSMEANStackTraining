import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  constructor(public taskSer: TaskService) { }

  ngOnInit(): void {
  }

  addTask(taskRef: any) {
    console.log(taskRef);
    this.taskSer.storeTask(taskRef);
  }
}
