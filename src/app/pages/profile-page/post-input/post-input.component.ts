import {Component, inject, input, Renderer2} from '@angular/core';
import {AvatarCircleComponent} from "../../../common-ui/avatar-circle/avatar-circle.component";
import {ProfileService} from "../../../data/services/profile.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    NgIf
  ],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  // Рендер стилей в Angular
  r2 = inject(Renderer2)
profile = inject(ProfileService).me
  onTextAreaInput (event:Event) {
    console.log('onTextAreaInput', event)
    // Делаем текстарею автоматический по высоте при вводе текста
    const textarea = event.target as HTMLTextAreaElement
    // Устанавливаем высоту текстареи авто если сброс
    this.r2.setStyle(textarea, 'height', 'auto')
    // Устанавливаем высоту текстареи равную высоте контента
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }
}
