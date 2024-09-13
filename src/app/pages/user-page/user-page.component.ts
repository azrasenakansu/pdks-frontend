import { StateService } from '../../services/state.service';
import { UserService } from '../../services/user.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmService } from '../../services/confirm.service';
import { UserEntity } from '../../models/entities/user';
import { Column } from '../../models/common/column';
import { UserComponent } from '../../components/user-component/user.component';
import { Table, TableModule, TablePageEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupService } from '../../services/popup.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'user-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent {
  private state: StateService = inject(StateService);
  private service: UserService = inject(UserService);
  private authService : AuthService = inject(AuthService)
  private dialogService: DialogService = inject(DialogService);
  private confirmService: ConfirmService = inject(ConfirmService);
  private popupService = inject(PopupService);
  ref: DynamicDialogRef | undefined;
  cols!: Column[];
  data = signal<UserEntity[]>([]);

  totalRows = signal<number>(0);
  page = 0;
  pageSize = 8;
  firstIndex = 0;

  ngOnInit() {
    this.cols = [
      { field: 'tckn', header: 'TC Kimlik Numarası' },
      { field: 'name', header: 'Adı Soyadı' },
      { field: 'email', header: 'Email' },
      { field: 'role.authority', header: 'Rol' },
      { field: 'operations', header: 'Eylemler' },
    ];
  }

  onPage(event: TablePageEvent) {
    this.page = event.first / event.rows;
  }

  resetPage() {
    this.page = 0;
    this.firstIndex = 0;
    this.load();
  }

  async load() {
    const datas = await this.service.getAllUsers(this.page, this.pageSize);
    this.totalRows.set(datas.totalElements);
    this.data.set(datas.content);
  }

  async delete(tckn: string) {
    if (
      await this.confirmService.confirm({
        message: 'Devam etmek istediğinize emin misiniz?',
        header: 'Kayıt Siliniyor',
        acceptStyle: 'p-button-danger',
        rejectStyle: 'p-button-secondary p-button-text',
      })
    ) {
      await this.service.deleteUser(tckn);
      this.load();
      this.popupService.success('Kullanıcı başarıyla silindi.');
    }
  }

  async resetPassword(tckn: string){
      if (
        await this.confirmService.confirm({
          message: 'Devam etmek istediğinize emin misiniz?',
          header: 'Şifre Sıfırlanıyor',
          acceptStyle: 'p-button-danger',
          rejectStyle: 'p-button-secondary p-button-text',
        })
      ) {
        await this.authService.resetPassword(tckn);
        this.popupService.success('Kullanıcı şifresi başarıyla sıfırlandı.');
      }
  }

  showDialog(item: UserEntity | null) {
    this.ref = this.dialogService.open(UserComponent, {
      header: item === null ? 'Kullanıcı Oluştur' : 'Kullanıcı Düzenle',
      data: item,
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.onClose.subscribe((result: boolean) => {
      if (result) {
        this.load();
      }
    });
  }
}
