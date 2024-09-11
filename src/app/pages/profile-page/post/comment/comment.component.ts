import {Component, input, Input} from '@angular/core';
import {CommentInterface} from "../../../../data/interfaces/post.interface";
import {AvatarCircleComponent} from "../../../../common-ui/avatar-circle/avatar-circle.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DatePipe
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  comment = input<CommentInterface>()

  // Метод для вычисления относительного времени
  getRelativeTime(createdAt: string): string {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffMs = now.getTime() - createdDate.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays > 1) {
      // Если прошло больше суток, возвращаем обычную дату
      return new DatePipe('en-US').transform(createdAt, 'dd.MM.yyyy HH:mm')!;
    } else {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor(diffMs / (1000 * 60));

      if (diffHours > 0) {
        return `${diffHours} час${diffHours === 1 ? '' : 'а'} назад`;
      } else {
        return `${diffMinutes} минут${diffMinutes === 1 ? 'а' : 'ы'} назад`;
      }
    }
  }
}
