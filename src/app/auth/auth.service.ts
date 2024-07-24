import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {AuthInterface} from "./auth.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  baseApiUrl = 'https://icherniakov.ru/yt-course/'
  token: string | null = null;
  refreshToken: string | null = null;

  get isAuthenticated() {
    return !!this.token;
  }

  login(payload: { username: string, password: string }) {
    const formData = new FormData();
    formData.append('username', payload.username);
    formData.append('password', payload.password);
    return this.http.post<AuthInterface>(this.baseApiUrl + 'auth/token', formData).pipe(
      tap(response => {
        this.token = response.access_token;
        this.refreshToken = response.refresh_token;
      })
    )
  }

  constructor() {
  }
}
