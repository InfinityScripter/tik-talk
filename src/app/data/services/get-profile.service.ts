import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GetProfileService {
  http = inject(HttpClient)

  beseApiUrl = 'https://icherniakov.ru/yt-course/'

  constructor() { }
  getTestAccount() {
    return this.http.get( `${this.beseApiUrl}account/test_accounts`)

  }
}
