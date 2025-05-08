import { Injectable } from '@angular/core';
import axios from 'axios';
import { BEURL } from '../../utils/config';

@Injectable({
  providedIn: 'root'
})
export class RegisterPageService {
  constructor() {}
  async register(userData: { name: string; email: string; password: string }): Promise<any> {
    try {
      const response = await axios.post(`${BEURL}/auth/register`, userData);
      localStorage.setItem('token', response.data.err.token);
      // alert(response.data.message);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.err.error || 'Registration failed');
        throw error.response.data;
      } else {
        alert('An unexpected error occurred during registration');
        throw error;
      }
    }
  }
}
