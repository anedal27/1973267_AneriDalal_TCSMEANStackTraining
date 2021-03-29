import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../tasks.model';

@Component({
  selector: 'app-display-tasks',
  templateUrl: './display-tasks.component.html',
  styleUrls: ['./display-tasks.component.css']
})
export class DisplayTasksComponent implements OnInit {
  allTasks: Array<Task> = [];
  columnsToDisplay = ['id', 'name', 'desc', 'deadline'];

  constructor(public taskSer: TaskService) { }

  ngOnInit(): void {
    this.taskSer.loadTasks().subscribe(result => this.allTasks = result);
  }
}
