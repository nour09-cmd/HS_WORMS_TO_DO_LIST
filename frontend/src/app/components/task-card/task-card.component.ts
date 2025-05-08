import { Component, EventEmitter, Input, Output } from '@angular/core';
import {ITasks} from "@fullstack/to_do_list"
@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input() task!: ITasks;
  @Output() toggleComplete = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onToggleComplete() {
    this.toggleComplete.emit(this.task._id);
  }

  onDelete() {
    this.delete.emit(this.task._id);
  }

  get dueDateClass() {
    return {
      'due-date': true,
      'completed': this.task.isCompleted
    };
  }
}
