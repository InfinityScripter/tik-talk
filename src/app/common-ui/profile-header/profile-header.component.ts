import {Component, input} from '@angular/core';

import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';
import {ProfileInterface} from "../../data/interfaces/profile.interface";
import {AvatarCircleComponent} from "../avatar-circle/avatar-circle.component";


@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [
    ImgUrlPipe,
    AvatarCircleComponent,

  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  profile = input<ProfileInterface>()
}
