import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CommentCreateDto, CommentInterface, PostCreateDto, PostInterface} from "../interfaces/post.interface";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PostService {
  http = inject(HttpClient)
  baseApiUrl = 'https://icherniakov.ru/yt-course/'

  posts = signal<PostInterface[]>([])

  createPost(payload: PostCreateDto) {
    return this.http.post<PostInterface>(`${this.baseApiUrl}post/`, payload)

  }

  fetchPost() {
    return this.http.get<PostInterface[]>(`${this.baseApiUrl}post/`)
      .pipe(
        tap(res => this.posts.set( res))
      )
  }

  createComment(payload: CommentCreateDto) {
    return this.http.post<CommentInterface>(`${this.baseApiUrl}comment/`, payload)
  }

  getCommentsByPostId (postId:number) {
    return this.http.get<PostInterface>(`${this.baseApiUrl}post/${postId}`)
      .pipe(
        map(res=>res.comments)
      )
  }
}
