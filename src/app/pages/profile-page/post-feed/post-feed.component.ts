import {Component, ElementRef, inject, Renderer2, OnDestroy, AfterViewInit} from '@angular/core';
import {PostInputComponent} from "../post-input/post-input.component";
import {PostComponent} from "../post/post.component";
import {PostService} from "../../../data/services/post.service";
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [
    PostInputComponent,
    PostComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent implements AfterViewInit, OnDestroy {
  postService = inject(PostService);
  feed = this.postService.posts;
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  private resizeSubscription!: Subscription;

  constructor() {
    firstValueFrom(this.postService.fetchPost());
  }

  ngAfterViewInit() {
    this.resizeFeed(); // Вызываем resize при инициализации компонента

    // Создаем подписку на событие resize с debounceTime 200 мс
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(500))
      .subscribe(() => this.resizeFeed());
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', height + 'px');
  }

  ngOnDestroy() {
    // Отписываемся от события resize при уничтожении компонента, чтобы избежать утечек памяти
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
