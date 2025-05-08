import { Component } from '@angular/core';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { ITasks } from '@fullstack/to_do_list';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
