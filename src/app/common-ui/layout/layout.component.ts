import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {GetProfileService} from "../../data/services/get-profile.service";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
profileService = inject(GetProfileService)

  ngOnInit() {
    console.log(this.profileService.getMe())
    this.profileService.getMe().subscribe(console.log)
  }
}
