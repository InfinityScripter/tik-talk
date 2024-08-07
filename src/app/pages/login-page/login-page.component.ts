import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  form = new FormGroup({
    username: new FormControl<string | null>(null, [Validators.required, Validators.required]),
    password: new FormControl(null, Validators.required),
  });

  isPasswordVisible = signal<boolean>(false);

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      const payload: { username: string, password: string } = {
        username: this.form.get('username')?.value ?? "",
        password: this.form.get('password')?.value ?? ""
      };
      this.authService.login(payload).subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(['']);
        },
        error => {
          console.error('Login failed', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
