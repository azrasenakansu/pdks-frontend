import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private messageService: MessageService = inject(MessageService);

  success(text?:string){
    this.messageService.add({
      severity: 'success',
      sticky: false,
      life: 3000,
      summary: 'Harika',
      detail: text === null ? "İşlem başarıyla tamamlandı." : text,
    });
  }

  info(text:string){
    this.messageService.add({
      severity: 'info',
      sticky: false,
      life: 3000,
      summary: 'Bilgilendirme',
      detail: text,
    });
  }

  errror(text:string){
    this.messageService.add({
      severity: 'error',
      sticky: true,
      summary: 'Hata',
      detail: text,
    });
  }

  warning(text:string){
    this.messageService.add({
      severity: 'warn',
      sticky: false,
      life: 3000,
      summary: 'Uyarı',
      detail: text,
    });
  }
  
}
