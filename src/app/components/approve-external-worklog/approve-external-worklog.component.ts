import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ExternalWorklogsService } from '../../services/external-worklogs.service';
import {
  DialogService,
  DynamicDialogComponent,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { PopupService } from '../../services/popup.service';
import { ExternalWorklog } from '../../models/entities/externalWorklog';
import {
  ExternalWorklogType,
  externalWorklogTypeToString,
} from '../../models/common/externalworklog-enum';
import { ConfirmationService } from 'primeng/api';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-approve-external-worklog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
  ],
  templateUrl: './approve-external-worklog.component.html',
  styleUrl: './approve-external-worklog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproveExternalWorklogComponent implements OnInit {
  private service: ExternalWorklogsService = inject(ExternalWorklogsService);
  private dialogService = inject(DialogService);
  private popupService = inject(PopupService);
  private confirmationService = inject(ConfirmationService);
  instance: DynamicDialogComponent | undefined;
  value: ExternalWorklog = {} as ExternalWorklog;
  //isApproved: boolean | null = null;

  constructor(public ref: DynamicDialogRef) {
    this.instance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {
    if (this.instance && this.instance.data) {
      const external = this.instance?.data as ExternalWorklog;
      this.value = external;
      this.value.userTckn = this.instance?.data.user.tckn;
    }
  }

  async approve(option: boolean | null) {
    //await this.service.approveExternalWorklog(this.value.id!, option);

    if (option) {
      await this.confirmationService.confirm({
        message: 'Onaylamak istediğinize emin miziniz?',
        header: 'Onaylanıyor',
        acceptButtonStyleClass: 'p-button-success',
        rejectButtonStyleClass: 'p-button-secondary',

        accept: () => {
          this.service.approveExternalWorklog(this.value.id!, option);
          this.popupService.success('Ek çalışma başarıyla onaylandı.');
        },
      });
    } else if (option === null) {
      await this.confirmationService.confirm({
        message: 'Beklemeye almak istediğinize emin miziniz?',
        header: 'Beklemeye Alınıyor',
        acceptButtonStyleClass: 'p-button-success',
        rejectButtonStyleClass: 'p-button-secondary',

        accept: () => {
          this.service.approveExternalWorklog(this.value.id!, option);
          this.popupService.success('Ek çalışma başarıyla beklemeye alındı.');
        },
      });
    } else {
      await this.confirmationService.confirm({
        message: 'Reddetmek istediğinize emin miziniz?',
        header: 'Reddediliyor',
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-secondary',

        accept: () => {
          this.service.approveExternalWorklog(this.value.id!, option);
          this.popupService.success('Ek çalışma başarıyla reddedildi.');
        },
      });
    }
    this.close(true);
  }

  stringifyType(value: ExternalWorklogType | null | undefined): string {
    return externalWorklogTypeToString(value);
  }

  close(result = false) {
    this.ref.close(result);
  }
}
