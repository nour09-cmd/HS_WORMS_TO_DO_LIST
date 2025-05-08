import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITasks } from '@fullstack/to_do_list';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule,CommonModule ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output() save = new EventEmitter<ITasks>();
  @Output() cancel = new EventEmitter<void>();

  task: Partial<ITasks> = {
    title: '',
    description: '',
    dueDate: '',
    isCompleted: false
  };

  onSave() {
    if (this.task.title) {
      this.save.emit(this.task as ITasks);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
