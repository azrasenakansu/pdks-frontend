import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseTagService } from '../../services/exercise-tag.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmService } from '../../services/confirm.service';
import { Column } from '../../models/common/column';
import { ExerciseTag } from '../../models/entities/exercise-tag';
import { ExerciseTagComponent } from '../../components/exercise-tag/exercise-tag.component';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { StateService } from '../../services/state.service';
import { AdminUsersListComponent } from '../../components/user-component/user-component';

@Component({
  selector: 'pdks-exercise-tag-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  templateUrl: './exercise-tag-page.component.html',
  styleUrl: './exercise-tag-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseTagPageComponent implements OnInit {
  private state: StateService = inject(StateService);
  private service: ExerciseTagService = inject(ExerciseTagService);
  private dialogService: DialogService = inject(DialogService);
  private confirmService: ConfirmService = inject(ConfirmService);
  ref: DynamicDialogRef | undefined;
  cols!: Column[];
  data = signal<ExerciseTag[]>([]);

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Etiket' },
      { field: 'description', header: 'Açıklama' },
      { field: 'operations', header: 'İşlemler' },
    ];
    this.load();
  }

  async load() {
    const datas = await this.service.ListAll();
    this.data.set(datas);
  }

  async delete(id:string){
    if(await this.confirmService.confirm({
      message: 'Devam etmek istediğinize emin misiniz?',
      header: 'Kayıt Siliniyor',
      acceptStyle: 'p-button-danger',
      rejectStyle: 'p-button-secondary p-button-text'
    })){
      await this.service.Delete(id);
      this.load();
    }
  }

  showDialog(item: ExerciseTag | null) {
    this.ref = this.dialogService.open(AdminUsersListComponent, {
      header: item === null ? 'Etiket Oluştur' : 'Etiket Düzenle',
      data: item,
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.onClose.subscribe((result: boolean) => {
      if(result){
        this.load();
      }
    });
  }

}
