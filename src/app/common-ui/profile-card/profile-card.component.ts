import {Component, Input} from '@angular/core';
import {ProfileInterface} from "../../data/interfaces/profile.interface";
import {NgForOf} from "@angular/common";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
    NgForOf,
    ImgUrlPipe,
    RouterLink
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
@Input() profile!: ProfileInterface
}
