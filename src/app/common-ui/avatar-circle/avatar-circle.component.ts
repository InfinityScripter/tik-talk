import {Component, input} from '@angular/core';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-avatar-circle',
  standalone: true,
  imports: [
    ImgUrlPipe,
    NgIf
  ],
  templateUrl: './avatar-circle.component.html',
  styleUrl: './avatar-circle.component.scss'
})
export class AvatarCircleComponent {
  avatarUrl = input<string | null>()
}
