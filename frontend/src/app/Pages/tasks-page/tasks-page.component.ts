import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ITasks } from '@fullstack/to_do_list';
import { AddTaskComponent } from '../../components/add-task/add-task.component';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { TasksPageService } from './tasks-page.service';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [CommonModule, AddTaskComponent, TaskCardComponent],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css'
})
export class TasksPageComponent implements OnInit {
  tasks: ITasks[] = [];
  isLoading = false;
  error: string | null = null;
  showAddDialog = false;

  constructor(private tasksPageService: TasksPageService) {}

  get pendingTasks(): ITasks[] {
    return this.tasks.filter(task => !task.isCompleted);
  }

  get completedTasks(): ITasks[] {
    return this.tasks.filter(task => task.isCompleted);
  }

  async ngOnInit(): Promise<void> {
    await this.loadTasks();
  }

  private async loadTasks(): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;
      const response = await this.tasksPageService.getTasks();
      this.tasks = response.tasks ?? [];
    } catch (err) {
      this.error = 'Failed to load tasks';
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }

  showAddTaskDialog() {
    this.showAddDialog = true;
  }

  async onTaskSaved(newTask: ITasks) {
    try {
      this.isLoading = true;
      this.tasks = [...this.tasks, newTask];
      const response = await this.tasksPageService.createTask(newTask);
      await this.loadTasks()
      this.showAddDialog = false;
    } catch (err) {
      this.error = 'Failed to save task';
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }

  onAddTaskCanceled() {
    this.showAddDialog = false;
  }

  async onToggleComplete(taskId: string) {
    try {
      const task = this.tasks.find(t => t._id === taskId);
      if (task) {
        task.isCompleted = !task.isCompleted;
        this.tasks = [...this.tasks];
        const response = await this.tasksPageService.updateTask(task._id, task);
      }
    } catch (err) {
      this.error = 'Failed to update task';
      console.error(err);
    }
  }

  async onDeleteTask(taskId: string) {
    try {
      this.tasks = this.tasks.filter(task => task._id !== taskId);
      const response = await this.tasksPageService.deleteTask(taskId);

    } catch (err) {
      this.error = 'Failed to delete task';
      console.error(err);
    }
  }
  logout() {
    localStorage.removeItem("token")
    location.reload()
  }
}
