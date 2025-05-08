import { Injectable } from '@angular/core';
import axios from 'axios';
import { BEURL, TOKEN } from '../../utils/config';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
  constructor() {}
  async login(userData: { email: string; password: string }): Promise<any> {
    try {
      const response = await axios.post(`${BEURL}/auth/login`, userData);
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
  async isValidToken(){
    const token = TOKEN();
    const response = await axios.get(`${BEURL}/auth/isValidToken`,token);
    return response;
  }
}
