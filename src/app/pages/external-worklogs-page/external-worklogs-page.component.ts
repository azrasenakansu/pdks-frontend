import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { StateService } from '../../services/state.service';
import { ExternalWorklogsService } from '../../services/external-worklogs.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmService } from '../../services/confirm.service';
import { PopupService } from '../../services/popup.service';
import { Column } from '../../models/common/column';
import { ExternalWorklog } from '../../models/entities/externalWorklog';
import { ExternalWorklogsComponent } from '../../components/external-worklogs/external-worklogs.component';

@Component({
  selector: 'app-external-worklogs-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  templateUrl: './external-worklogs-page.component.html',
  styleUrl: './external-worklogs-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalWorklogsPageComponent {
  private state: StateService = inject(StateService);
  private service: ExternalWorklogsService = inject(ExternalWorklogsService);
  private dialogService: DialogService = inject(DialogService);
  private confirmService: ConfirmService = inject(ConfirmService);
  private popupService = inject(PopupService);
  ref: DynamicDialogRef | undefined;
  cols!: Column[];
  enumToStringList = signal<string[]>([]);
  data = signal<ExternalWorklog[]>([]);

  ngOnInit() {
    this.cols = [
      { field: 'userTckn', header: 'TC Kimlik Numarası' },
      { field: 'date', header: 'Tarih' },
      { field: 'hours', header: 'Başlangıç - Bitiş Saati' },
      { field: 'description', header: 'Açıklama' },
      { field: 'enumToStringList', header: 'Çalışma Tipi' },
      //{ field: 'isApproved', header: 'Onay Durumu' },
      { field: 'operations', header: 'Eylemler' },
    ];
    this.enumToStringList.set(['OTHER', 'HYBRID', 'ASELSAN']); // Set the enum string list

    this.load();
  }

  async load() {
    const datas = await this.service.getExternalWorklog();
    this.data.set(datas);
  }

  async delete(id: number) {
    if (
      await this.confirmService.confirm({
        message: 'Devam etmek istediğinize emin misiniz?',
        header: 'Çalışma Kaydı Siliniyor',
        acceptStyle: 'p-button-danger',
        rejectStyle: 'p-button-secondary p-button-text',
      })
    ) {
      await this.service.deleteExternalWorklog(id);
      this.load();
      this.popupService.success('Çalışma Kaydı başarıyla silindi.');
    }
  }
  showDialog(item: ExternalWorklog | null) {
    this.ref = this.dialogService.open(ExternalWorklogsComponent, {
      header: item === null ? 'Ek Çalışma Oluştur' : 'Ek Çalışma Düzenle',
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

  async approve(id: number, state: boolean | null) {
    await this.service.approveExternalWorklog(id, state);
    this.load();
    this.popupService.success('Çalışma Kaydı başarıyla onaylandı.');
}
}
