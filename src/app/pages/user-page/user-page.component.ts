import { StateService } from '../../services/state.service';
import { UserService } from '../../services/user.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmService } from '../../services/confirm.service';
import { UserEntity } from '../../models/entities/user';
import { Column } from '../../models/common/column';
import { UserComponent } from '../../components/user-component/user.component';
import { Table, TableModule } from 'primeng/table';
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
  private dialogService: DialogService = inject(DialogService);
  private confirmService: ConfirmService = inject(ConfirmService);
  private popupService = inject(PopupService);
  ref: DynamicDialogRef | undefined;
  cols!: Column[];
  data = signal<UserEntity[]>([]);

  ngOnInit() {
    this.cols = [
      { field: 'tckn', header: 'TC Kimlik Numarası' },
      { field: 'name', header: 'Adı Soyadı' },
      { field: 'email', header: 'Email' },
      { field: 'role.authority', header: 'Rol' },
      { field: 'operations', header: 'Eylemler' },
    ];
    this.load();
  }

  async load() {
    const datas = await this.service.getAllUsers();
    this.data.set(datas);
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
