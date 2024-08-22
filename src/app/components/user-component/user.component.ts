import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../services/user.service';
import {
  DialogService,
  DynamicDialogComponent,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { PopupService } from '../../services/popup.service';
import { UserEntity } from '../../models/entities/user';
import { DropdownModule } from 'primeng/dropdown';
import { RoleEnum } from '../../models/common/role-enum';
import { Role } from '../../models/entities/role';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-admin-users-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './user-component.html',
  styleUrl: './user-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  private service: UserService = inject(UserService);
  private dialogService = inject(DialogService);
  private popupService = inject(PopupService);
  private roleService: RoleService = inject(RoleService);
  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);
  instance: DynamicDialogComponent | undefined;
  value: UserEntity = {} as UserEntity;

  roles: Role[] = [];
  isUpdate = false;

  constructor(public ref: DynamicDialogRef) {
    this.instance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {
    if (this.instance && this.instance.data) {
      this.isUpdate = true;
      const user = this.instance?.data as UserEntity;
      this.value = user;
    }
    this.fetch();
  }

  async fetch(){
    this.roles = await this.roleService.getRoles();    
    if(!this.isUpdate){
      const userRoleIndex = this.roles.findIndex(role => role.authority === "USER");
      if(userRoleIndex !== -1){
        this.value.role = this.roles.at(userRoleIndex)!;
      }
    }
    this.changeDetector.detectChanges();
  }

  close(result = false) {
    this.ref.close(result);
  }

  async save() {
    if (!this.isUpdate) {
      await this.service.createUser(this.value);
    } else {
      await this.service.updateUser(this.value.tckn, this.value);
    }
    this.popupService.success('Kullanıcı başarıyla kaydedildi.');
    this.close(true);
  }
}
