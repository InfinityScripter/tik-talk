import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {map, startWith, switchMap} from 'rxjs';

import {ChatsBtnComponent} from '../chats-btn/chats-btn.component';
import {ChatsService} from "../../../data/services/chats.service";

@Component({
  selector: 'app-chats-page-list',
  standalone: true,
  imports: [
    ChatsBtnComponent,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {
  chatsService = inject(ChatsService)

  filterChatsControl = new FormControl('')
  // Получаем чаты пользователя с бека
  chats$ = this.chatsService.getMyChats()
    /**
     * Был один стрим, мы его преобразовали в другой стрим
     * с помощью SwitchMap и значение этого стрима финального
     * мы видоизменили с помощью оператора map. Видоизменяли его
     * На отфильтрованные чаты
     * */
    .pipe(
      switchMap(chats => {
        // Переключаемся на чаты, когда они придут(изменили стрим и подписались на формы контрола)
        return this.filterChatsControl.valueChanges
          .pipe(
            startWith(''),
            // Фильтруем чаты по имени пользователя
            map(inputValue => {
              return chats.filter(chat => {
                return `${chat.userFrom.lastName} ${chat.userFrom.firstName}`.toLowerCase().includes(inputValue?.toLowerCase() ?? '')
              })
            })
          )
      })
    )
}
