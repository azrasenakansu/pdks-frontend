import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import {
  DialogService,
  DynamicDialogComponent,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { PopupService } from '../../services/popup.service';
import { Credentials } from '../../models/entities/credential';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, PasswordModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private dialogService = inject(DialogService);
  private popupService = inject(PopupService);
  private router = inject(Router);
  value: Credentials = {} as Credentials;
  instance: DynamicDialogComponent | undefined;
  attempt: boolean = false;

  constructor(public ref: DynamicDialogRef) {
    this.instance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {}

  close(result = false) {
    this.ref.close(result);
  }

  async changePassword() {
    if (this.value.newPass === this.value.newPassAgain) {
      await this.authService.changePassword(
        this.value.currentPass,
        this.value.newPass
      );
      this.close();
      this.popupService.success("Şifreniz başarıyla değiştirildi. Lütfen yeniden giriş yapınız.")
      this.authService.logout();
      this.router.navigateByUrl('login', { replaceUrl: true });
    } else{
      this.popupService.warning('Yeni şifreleriniz uyuşmuyor!');
      this.attempt = true;
    }
  }
}
