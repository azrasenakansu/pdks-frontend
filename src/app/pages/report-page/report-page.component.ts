import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { WorklogEndpointService } from '../../services/worklog.service';
import { ConfirmService } from '../../services/confirm.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PopupService } from '../../services/popup.service';
import { StateService } from '../../services/state.service';
import { Column } from '../../models/common/column';
import { WorklogReportDTO } from '../../models/common/worklog-report-dto';

@Component({
  selector: 'app-report-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  templateUrl: './report-page.component.html',
  styleUrl: './report-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportPageComponent {
  private state: StateService = inject(StateService);
  private dialogService: DialogService = inject(DialogService);
  private popupService = inject(PopupService);
  private confirmService: ConfirmService = inject(ConfirmService);
  private service: WorklogEndpointService = inject(WorklogEndpointService);
  ref: DynamicDialogRef | undefined;
  cols!: Column[];
  data = signal<WorklogReportDTO[]>([]);
  endDate: Date = new Date();
  startDate: Date = new Date();

  ngOnInit() {
    const now = new Date();
    this.startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    this.endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    this.cols = [
      { field: 'tckn', header: 'TC Kimlik Numarası' },
      { field: 'name', header: 'Adı Soyadı' },
      { field: 'date', header: 'Tarih' },
      { field: 'hours', header: 'Başlangıç - Bitiş Saati' },
      { field: 'ext_hours', header: 'Ek Çalışma Saati' },
      { field: 'ext_descriptions', header: 'Açıklama' },
      { field: 'total_time', header: 'Toplam Çalışma Saati' },
    ];

    this.load();
  }

  async load() {
    const datas = await this.service.getWorklogReports(
      this.startDate,
      this.endDate
    );
    this.data.set(datas);
  }
}
