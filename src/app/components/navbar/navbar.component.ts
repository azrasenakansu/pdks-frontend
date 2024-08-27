import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../services/state.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmService } from '../../services/confirm.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'pdks-navbar',
  standalone: true,
  imports: [CommonModule, MenuModule, ConfirmDialogModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  state = inject(StateService);
  auth = inject(AuthService);
  router = inject(Router);
  private dialogService: DialogService = inject(DialogService);
  ref: DynamicDialogRef | undefined;
  items: MenuItem[] | undefined;
  confirmService = inject(ConfirmService);

  ngOnInit(): void {
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
      {
        label: 'Şifre Değiştir',
        icon: 'pi pi-lock',
        command: () => this.showDialog(),
      },
    ];
  }

  async logout() {
    if (
      await this.confirmService.confirm({
        message: 'Devam etmek istediğinize emin misiniz?',
        header: 'Çıkış Yapılıyor',
        acceptStyle: 'p-button-danger',
        rejectStyle: 'p-button-secondary p-button-text',
      })
    ) {
      this.auth.logout();
      this.router.navigateByUrl('login', { replaceUrl: true });
    }
  }

  showDialog() {
    this.ref = this.dialogService.open(ChangePasswordComponent, {
      header: 'Şifre Değişikliği',
      width: '20%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    // this.ref.onClose.subscribe((result: boolean) => {
    //   if (result) {
    //     this.load();
    //   }
    // });
  }
}
