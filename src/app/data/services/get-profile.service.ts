import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProfileInterface} from "../interfaces/profile.interface";

@Injectable({
  providedIn: 'root'
})
export class GetProfileService {
  http = inject(HttpClient)

  baseApiUrl = 'https://icherniakov.ru/yt-course/'

  constructor() { }
  getTestAccount() {
    return this.http.get<ProfileInterface[]>( `${this.baseApiUrl}account/test_accounts`)

  }

  getMe () {
    return this.http.get<ProfileInterface>(`${this.baseApiUrl}account/me`)
  }
}
