import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProfileInterface} from "../interfaces/profile.interface";
import {PagebleInterface} from "../interfaces/pageble.interface";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)

  baseApiUrl = 'https://icherniakov.ru/yt-course/'
  me = signal<ProfileInterface|null>(null)


  constructor() { }
  getTestAccount() {
    return this.http.get<ProfileInterface[]>( `${this.baseApiUrl}account/test_accounts`)

  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http.get<PagebleInterface<ProfileInterface>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(
        map(res => res.items.slice(0, subsAmount))
      )
  }


  getMe () {
    return this.http.get<ProfileInterface>(`${this.baseApiUrl}account/me`)
      .pipe(
tap(res=> this.me.set(res) )
      )
  }

  getAccount(id: string) {
    return this.http.get<ProfileInterface>(`${this.baseApiUrl}account/${id}`)
  }

  patchProfile(data: Partial<ProfileInterface>) {
    return this.http.patch<ProfileInterface>(`${this.baseApiUrl}account/me`, data)
      // .pipe(
      //   tap(res => this.me.set(res))
      // )
  }
  uploadAvatar(file: File) {
    const fd = new FormData()
    fd.append('image', file)

    return this.http.post<ProfileInterface>(
      `${this.baseApiUrl}account/upload_image`,
      fd
    )
  }
}

