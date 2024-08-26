import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ExternalWorklogsService } from '../../services/external-worklogs.service';
import {formatDate} from '@angular/common';
import {
  DialogService,
  DynamicDialogComponent,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { PopupService } from '../../services/popup.service';
import { ExternalWorklog } from '../../models/entities/externalWorklog';
import { StringValue } from '../../models/common/string-value';
import { CalendarModule } from 'primeng/calendar';
import { stringValueToWorklogTypeEnum } from '../../models/common/externalworklog-enum';

@Component({
  selector: 'app-external-worklogs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule
  ],
  templateUrl: './external-worklogs.component.html',
  styleUrl: './external-worklogs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalWorklogsComponent implements OnInit {
  private service: ExternalWorklogsService = inject(ExternalWorklogsService);
  private dialogService = inject(DialogService);
  private popupService = inject(PopupService);
  //private roleService: RoleService = inject(RoleService);
  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);
  instance: DynamicDialogComponent | undefined;
  value: ExternalWorklog = {} as ExternalWorklog;

  worklogTypes: StringValue[] | undefined;
  selectedWorklogType: StringValue | undefined;
  
  startDate: Date | undefined = new Date();
  startTime: Date | undefined;
  endTime: Date | undefined;


  isUpdate = false;
  isApprove=false;

  constructor(public ref: DynamicDialogRef) {
    this.instance = this.dialogService.getInstance(this.ref);
  }
  ngOnInit(): void {
    
    this.worklogTypes = [{value:"Diğer"},{value:"Hybrid"},{value:"Aselsan"}];
    const now = new Date();
    this.startTime = new Date(now.getFullYear(), now.getMonth(), now.getDay(), 9, 0, 0);
    this.endTime = new Date(now.getFullYear(), now.getMonth(), now.getDay(), 18, 0, 0);
    if (this.instance && this.instance.data) {
      this.isUpdate = true;
      const external = this.instance?.data as ExternalWorklog;
      this.value = external;
    }
    
  }

  close(result = false) {
    this.ref.close(result);
  }

  async save() {
    if(this.startTime === undefined || this.endTime === undefined ||this.startTime === null || this.endTime === null||this.startDate === null||this.startDate === undefined){
      this.popupService.warning("Başlangıç - Bitiş Saatleri Boş Bırakılamaz");
      return;
    }
    this.value.date = new Date(this.startDate);
    this.value.type = stringValueToWorklogTypeEnum(this.selectedWorklogType);
    this.value.from = formatDate(this.startTime,'HH:mm', "en-US");
    this.value.to = formatDate(this.endTime,'HH:mm', "en-US");
    if (!this.isUpdate) {
      await this.service.createExternalWorklog(this.value);
    } else {
      await this.service.updateExternalWorklog(this.value.id!, this.value);
    }
    if(!this.isApprove){
      await this.service.approveExternalWorklog(this.value.id!,this.value.isApproved);
    }
    this.popupService.success('Ek Çalışma başarıyla kaydedildi.');
    this.close(true);
  }
}
