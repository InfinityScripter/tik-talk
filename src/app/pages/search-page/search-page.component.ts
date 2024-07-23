import {Component, inject} from '@angular/core';
import {ProfileCardComponent} from "../../common-ui/profile-card/profile-card.component";
import {GetProfileService} from "../../data/services/get-profile.service";
import {ProfileInterface} from "../../data/interfaces/profile.interface";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  title = 'tik-talk';
  profileService = inject(GetProfileService)
  profiles: ProfileInterface[] = []

  constructor() {
    this.profileService.getTestAccount().subscribe(value => {
      this.profiles = value
    })
  }

}
