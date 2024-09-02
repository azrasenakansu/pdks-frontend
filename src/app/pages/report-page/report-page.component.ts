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
import { MultiSelectModule } from 'primeng/multiselect';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { RoleEnum } from '../../models/common/role-enum';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-report-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, MultiSelectModule,FormsModule,CalendarModule],
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
  private userService: UserService = inject(UserService);
  ref: DynamicDialogRef | undefined;
  cols!: Column[];
  data = signal<WorklogReportDTO[]>([]);
  endDate: Date = new Date();
  startDate: Date = new Date();
  selectedTckns = signal<string[]>([]);
  tcknOptions = signal<string[]>([]);
  permissions = this.state.$role();
  roleEnum = this.permissions?.authority === "ADMIN" ? RoleEnum.ADMIN : RoleEnum.USER;
  isAdmin: boolean = false
  selectedMonth: Date | undefined;

  ngOnInit() {
    const now = new Date();
    this.selectedMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    this.cols = [
      { field: 'tckn', header: 'TC Kimlik Numarası' },
      { field: 'name', header: 'Adı Soyadı' },
      { field: 'date', header: 'Tarih' },
      { field: 'hours', header: 'Başlangıç - Bitiş Saati' },
      { field: 'ext_hours', header: 'Ek Çalışma Saati' },
      { field: 'ext_descriptions', header: 'Açıklama' },
      { field: 'total_time', header: 'Toplam Çalışma Saati' },
    ];
    this.isAdmin = this.roleEnum===RoleEnum.ADMIN;
    this.loadTcknOptions();
    this.load();
  }

  async load() {
    this.startDate = new Date(this.selectedMonth!.getFullYear(),this.selectedMonth!.getMonth(), 1)
    this.endDate = new Date(this.selectedMonth!.getFullYear(),this.selectedMonth!.getMonth()+1, 0)
    const datas = await this.service.getWorklogReports(
      this.startDate,
      this.endDate,
      this.selectedTckns()
    );
    this.data.set(datas);
  }

  async downloadReport(){
    this.startDate = new Date(this.selectedMonth!.getFullYear(),this.selectedMonth!.getMonth(), 1)
    this.endDate = new Date(this.selectedMonth!.getFullYear(),this.selectedMonth!.getMonth()+1, 0)
    const response = await this.service.downloadWorklogReport(this.startDate, this.endDate, this.selectedTckns());
    const filename = response.headers.get('content-disposition')?.split('filename=')[1] as string;
    const blob = response.body as Blob;    
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async loadTcknOptions() {
    const tckns = await this.userService.getAllTckns();
    this.tcknOptions.set(tckns);
  }

  onTcknChange(selectedTckns: string[]) {
    this.selectedTckns.set(selectedTckns);
  }
}
