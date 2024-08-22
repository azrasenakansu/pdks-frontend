import { Component, inject } from '@angular/core';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { PopupService } from '../../services/popup.service';
import { ImportService } from '../../services/import.service';

@Component({
  selector: 'upload',
  standalone: true,
  imports: [FileUploadModule],
  templateUrl: './upload-page.component.html',
  styleUrl: './upload-page.component.css'
})
export class UploadPageComponent {
  private service = inject(ImportService);
  private popupService = inject(PopupService);
  uploadDisable = false;

  async uploadHandler(event: FileUploadHandlerEvent){
    const file = event.files.at(0);
    if(file !== undefined && file !== null){
       await this.service.uploadWorklog(file);
       this.uploadDisable = true;
       this.popupService.success(file.name + " başarıyla yüklendi.");
    }
  }

}
