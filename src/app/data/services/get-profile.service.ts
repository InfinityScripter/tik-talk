import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProfileInterface} from "../interfaces/profile.interface";

@Injectable({
  providedIn: 'root'
})
export class GetProfileService {
  http = inject(HttpClient)

  beseApiUrl = 'https://icherniakov.ru/yt-course/'

  constructor() { }
  getTestAccount() {
    return this.http.get<ProfileInterface[]>( `${this.beseApiUrl}account/test_accounts`)

  }
}
