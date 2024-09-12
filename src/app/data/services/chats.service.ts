import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ChatInterface, LastMessageRes} from "../interfaces/chats.interface";
import {ProfileService} from "./profile.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ChatsService {

  http = inject(HttpClient)
  me = inject(ProfileService).me
  baseApiUrl = 'https://icherniakov.ru/yt-course/'
  chatsApiUrl = `${this.baseApiUrl}chat/`
  messageApiUrl = `${this.baseApiUrl}message/`

  createChat(userId: number) {
    return this.http.post<ChatInterface>(`${this.chatsApiUrl}${userId}`, {})
  }

  getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.chatsApiUrl}get_my_chats/`)
  }

  getChatById(chatId: number) {
    return this.http.get<ChatInterface>(`${this.chatsApiUrl}${chatId}`)
      .pipe(map(chat => {
        const patchedMessages = chat.messages.map(message => {
          return {
            ...message,
            user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
            isMine: message.userFromId === this.me()!.id
          }
        })

        // this.activeChatMessages.set(patchedMessages)

        return {
          ...chat,
          companion: chat.userFirst.id === this.me()!.id ? chat.userSecond : chat.userFirst,
          messages: patchedMessages


        }
      }))
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post(`${this.messageApiUrl}send/${chatId}`, {}, {
      params: {
        message
      }
    })
  }
}
