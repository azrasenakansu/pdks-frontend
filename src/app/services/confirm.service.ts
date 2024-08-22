import { Injectable, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: "root"
})
export class ConfirmService {
  private confirmationService = inject(ConfirmationService);

  confirm({
    message = "Are you sure that you want to proceed?",
    header = "Confirmation",
    acceptStyle = "p-button-primary",
    rejectStyle = "p-button-text"
  } = {}): Promise<boolean> {
    return new Promise(resolve => {
      console.log(
        this.confirmationService.confirm({
          message,
          header,
          acceptIcon:"none",
          rejectIcon:"none",
          dismissableMask: true,
          acceptButtonStyleClass: acceptStyle,
          rejectButtonStyleClass: rejectStyle,
          accept: () => {
            resolve(true);
          },
          reject: () => {
            resolve(false);
          }
        })
      );
    });
  }
}

