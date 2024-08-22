/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'pdks-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent{
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private popupService: PopupService = inject(PopupService);

  username = '';
  password = '';

  async onLoginBtnClicked() {
    this.popupService.info("Giriş yapılıyor.");
    const result = await this.authService.login(this.username, this.password);
    if(result){
      this.authService.loadState();
      this.popupService.success("Giriş yapıldı.");
      this.router.navigate(['/'], { replaceUrl: true });
    }
    else{
      this.popupService.errror("Kullanıcı adı veya şifre hatalı.");
    }
  }
}
