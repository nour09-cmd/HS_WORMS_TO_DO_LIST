import { Injectable } from '@angular/core';
import axios from 'axios';
import { BEURL, TOKEN } from '../../utils/config';
import { ITasks } from '@fullstack/to_do_list';

@Injectable({
  providedIn: 'root'
})
export class TasksPageService {
  token:any;
  constructor() {
    this.token = TOKEN()
  }

  async getTasks() {
    try {
      const response = await axios.get(`${BEURL}/tasks/task`,this.token);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async createTask( taskData: ITasks) {
    try {
      const response = await axios.post(`${BEURL}/tasks/task`, taskData,this.token);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async updateTask( taskId: string, taskData: ITasks) {
    try {
      const response = await axios.post(`${BEURL}/tasks/task/${taskId}`, taskData, this.token);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteTask( taskId: string) {
    try {
      const response = await axios.delete(`${BEURL}/tasks/task/${taskId}`,this.token);
      return response.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}
