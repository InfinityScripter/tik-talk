import {Component, inject, signal} from '@angular/core';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {GetProfileService} from "../../data/services/get-profile.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {switchMap} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {AsyncPipe} from "@angular/common";
import {SvgComponent} from "../../common-ui/svg/svg.component";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    SvgComponent,
    RouterLink,
    ImgUrlPipe,

  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(GetProfileService)
  // chatsService = inject(ChatsService)
  route = inject(ActivatedRoute)
  router = inject(ActivatedRoute)

  me$ = toObservable(this.profileService.me)
  subcribers$ = this.profileService.getSubscribersShortList(5)

  isMyPage = signal(false)

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id)
        if (id === 'me') return this.me$

        return this.profileService.getAccount(id)
      })
    )

  // async sendMessage(userId: number) {
  //   firstValueFrom(this.chatsService.createChat(userId))
  //     .then((res) => {
  //       this.router.navigate(['/chats', res.id])
  //     })
  // }

}
