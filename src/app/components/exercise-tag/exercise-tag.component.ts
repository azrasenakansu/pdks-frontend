import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseTagService } from '../../services/exercise-tag.service';
import { ExerciseTag } from '../../models/entities/exercise-tag';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PopupService } from '../../services/popup.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'pdks-exercise-tag',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './exercise-tag.component.html',
  styleUrl: './exercise-tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseTagComponent implements OnInit {
  private service: ExerciseTagService = inject(ExerciseTagService);
  private dialogService = inject(DialogService);
  private popupService = inject(PopupService);
  instance: DynamicDialogComponent | undefined;
  value: ExerciseTag = {} as ExerciseTag;
  isUpdate = false;

  constructor(public ref: DynamicDialogRef) {
    this.instance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {
    if (this.instance && this.instance.data) {
      this.isUpdate = true;
      const section = this.instance?.data as ExerciseTag;
      this.value = section;
    }
  }

  close(result = false) {
    this.ref.close(result);
  }

  async save() {
    if(!this.isUpdate){
      await this.service.Create(this.value);
    }
    else{
      await this.service.Update(this.value);
    }
    this.popupService.success("Etiket başarıyla kaydedildi.")
    this.close(true);
  }

}
