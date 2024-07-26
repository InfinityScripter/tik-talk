import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap, throwError} from "rxjs";
import {AuthInterface} from "./auth.interface";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  baseApiUrl = 'https://icherniakov.ru/yt-course/'
  token: string | null = null;
  refreshToken: string | null = null;
  cookieService = inject(CookieService)
  router = inject(Router)

  get isAuthenticated() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.token;
  }

  login(payload: { username: string, password: string }) {
    const formData = new FormData();
    formData.append('username', payload.username);
    formData.append('password', payload.password);
    return this.http.post<AuthInterface>(this.baseApiUrl + 'auth/token', formData).pipe(
      tap(response => {this.saveTokens(response);})
    )
  }

  refreshAuthToken() {
    return this.http.post<any>(
      `${this.baseApiUrl}auth/refresh`,
      {
        refresh_token: this.refreshToken
      }
    ).pipe (
      tap(response => {this.saveTokens(response)}),
      catchError(err => {
        this.logout();
        return throwError(err)
      })
    )
  }

  logout() {

    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  saveTokens(response:AuthInterface){
    this.token = response.access_token;
    this.refreshToken = response.refresh_token;

    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refreshToken);
  }
}
