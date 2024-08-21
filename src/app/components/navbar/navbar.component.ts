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
  items: MenuItem[] | undefined;
  confirmService = inject(ConfirmService);

  ngOnInit(): void {
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      },
    ];
  }

  async logout() {
    if(await this.confirmService.confirm({
      message: 'Devam etmek istediğinize emin misiniz?',
      header: 'Çıkış Yapılıyor',
      acceptStyle: 'p-button-danger',
      rejectStyle: 'p-button-secondary p-button-text'
    })){
      this.auth.logout();
      this.router.navigateByUrl('login', {replaceUrl: true});
    }
  }
}
