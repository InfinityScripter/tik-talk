import {Component, EventEmitter, HostBinding, inject, input, Output, Renderer2} from '@angular/core';
import {AvatarCircleComponent} from "../../../common-ui/avatar-circle/avatar-circle.component";
import {ProfileService} from "../../../data/services/profile.service";
import {NgIf} from "@angular/common";
import {SvgComponent} from "../../../common-ui/svg/svg.component";
import {PostService} from "../../../data/services/post.service";
import {FormsModule} from "@angular/forms";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    NgIf,
    SvgComponent,
    FormsModule
  ],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  // является ли инпут для комментария
  isCommentInput = input(false)
  postId = input<number>(0)
  // Рендер стилей в Angular
  r2 = inject(Renderer2)
  // Сервис для создания постов
  postService = inject(PostService)
  profile = inject(ProfileService).me
  postText = ''

  @Output() created = new EventEmitter()

  // Декоратор для добавления класса (например для стилей)
  @HostBinding('class.comment') get isComment() {
    return this.isCommentInput()
  }

  onTextAreaInput(event: Event) {
    console.log('onTextAreaInput', event)
    // Делаем текстарею автоматический по высоте при вводе текста
    const textarea = event.target as HTMLTextAreaElement
    // Устанавливаем высоту текстареи авто если сброс
    this.r2.setStyle(textarea, 'height', 'auto')
    // Устанавливаем высоту текстареи равную высоте контента
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }

  async onCreatePost() {
    if (!this.postText) return;
if (this.isCommentInput()){
  await firstValueFrom(this.postService.createComment({
    text: this.postText,
    authorId: this.profile()!.id,
    postId: this.postId()
  }));
  this.postText = '';
  // Отправляем событие создания комментария
  this.created.emit();

}
    await firstValueFrom(this.postService.createPost({
      title: 'New post',
      content: this.postText,
      authorId: this.profile()!.id
    }));

    // Очищаем текстовое поле после отправки
    this.postText = '';
  }
}
