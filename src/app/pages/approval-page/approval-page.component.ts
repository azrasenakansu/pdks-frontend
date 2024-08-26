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
import {
  ExternalWorklogType,
  externalWorklogTypeFromValue,
  externalWorklogTypeToString,
} from '../../models/common/externalworklog-enum';
import { ApproveExternalWorklogComponent } from '../../components/approve-external-worklog/approve-external-worklog.component';

@Component({
  selector: 'app-approval-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  templateUrl: './approval-page.component.html',
  styleUrl: './approval-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprovalPageComponent {
  private state: StateService = inject(StateService);
  private service: ExternalWorklogsService = inject(ExternalWorklogsService);
  private dialogService: DialogService = inject(DialogService);
  private confirmService: ConfirmService = inject(ConfirmService);
  private popupService: PopupService = inject(PopupService);
  crudRef: DynamicDialogRef | undefined;
  approveRef: DynamicDialogRef | undefined;
  cols!: Column[];
  data = signal<ExternalWorklog[]>([]);

  ngOnInit() {
    this.cols = [
      { field: 'tckn', header: 'TC Kimlik Numarası' },
      { field: 'date', header: 'Tarih' },
      { field: 'hours', header: 'Başlangıç - Bitiş Saati' },
      { field: 'description', header: 'Açıklama' },
      { field: 'type', header: 'Çalışma Tipi' },
      { field: 'isApproved', header: 'Onay Durumu' },
      { field: 'operations', header: 'Eylemler' },
    ];

    this.load();
  }

  stringifyType(value: ExternalWorklogType | null | undefined): string {
    return externalWorklogTypeToString(value);
  }

  async load() {
    const datas = await this.service.pendingExternalWorklog();
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
    this.crudRef = this.dialogService.open(ExternalWorklogsComponent, {
      header: item === null ? 'Ek Çalışma Oluştur' : 'Ek Çalışma Düzenle',
      data: item,
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.crudRef.onClose.subscribe((result: boolean) => {
      if (result) {
        this.load();
      }
    });
  }

  approveDialog(item: ExternalWorklog | null) {
    this.approveRef = this.dialogService.open(ApproveExternalWorklogComponent, {
      header: 'Onaylama İşlemi',
      data: item,
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });
    this.approveRef.onClose.subscribe((result: boolean) => {
      if (result) {
        this.load();
      }
    });
  }
}
