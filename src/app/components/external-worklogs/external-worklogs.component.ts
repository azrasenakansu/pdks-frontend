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
import { externalWorklogTypeToString, stringValueToWorklogTypeEnum } from '../../models/common/externalworklog-enum';

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

  isUpdate = false;

  constructor(public ref: DynamicDialogRef) {
    this.instance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {
    this.worklogTypes = [{value:"Diğer"},{value:"Hybrid"},{value:"Aselsan"}];
    if (this.instance && this.instance.data) {
      this.isUpdate = true;
      const external = this.instance?.data as ExternalWorklog;
      this.value = external;
      this.selectedWorklogType = {value: externalWorklogTypeToString(this.value.type)};
    }
    else{
      const now = new Date();
      this.value.date = formatDate(now, 'dd/MM/yyyy', 'en-US');
      this.value.from = "09:00";
      this.value.to = "18:00";
    }
    this.changeDetector.detectChanges();
  }

  close(result = false) {
    this.ref.close(result);
  }

  async save() {
    if(this.value.from === undefined || this.value.to === undefined ||this.value.from === null || this.value.to === null||this.value.date === null||this.value.date === undefined){
      this.popupService.warning("Başlangıç - Bitiş Saatleri Boş Bırakılamaz");
      return;
    }
    this.value.type = stringValueToWorklogTypeEnum(this.selectedWorklogType);
    if (!this.isUpdate) {
      await this.service.createExternalWorklog(this.value);
    } else {
      await this.service.updateExternalWorklog(this.value.id!, this.value);
    }
    this.popupService.success('Ek Çalışma başarıyla kaydedildi.');
    this.close(true);
  }
}
