import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProfileCardComponent} from "./common-ui/profile-card/profile-card.component";
import {GetProfileService} from "./data/services/get-profile.service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tik-talk';
  profileService = inject(GetProfileService)
  profiles: any = []

  constructor() {
    this.profileService.getTestAccount().subscribe(value => {
      this.profiles = value
    })
  }

}
